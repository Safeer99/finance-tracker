"use client";

import React, { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { transactions as transactionsSchema } from "@/db/schema";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { columns } from "./columns";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [SelectAccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState<
    typeof INITIAL_IMPORT_RESULTS
  >(INITIAL_IMPORT_RESULTS);

  const newTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const bulkCreateMutation = useBulkCreateTransactions();
  const deleteTransactions = useBulkDeleteTransactions();

  const transactions = transactionsQuery.data || [];
  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setVariant(VARIANTS.IMPORT);
    setImportResults(results);
  };

  const onCancelImport = () => {
    setVariant(VARIANTS.LIST);
    setImportResults(INITIAL_IMPORT_RESULTS);
  };

  const onSubmitImport = async (
    values: (typeof transactionsSchema.$inferInsert)[]
  ) => {
    const accountId = await confirm();

    if (!accountId) {
      return toast.error("Please select an account to continue.");
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    bulkCreateMutation.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (transactionsQuery.isLoading) {
    return <LoadingTransactionsPage />;
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <SelectAccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={newTransaction.onOpen}
              size="sm"
              className="w-full"
            >
              <Plus className="size-4 mr-2" /> Add new transaction
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="payee"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;

const LoadingTransactionsPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
