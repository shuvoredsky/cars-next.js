"use client";
import AddForm from "@/components/AddForm";
import UpdateForm from "@/components/UpdateForm";
import { useParams } from "next/navigation";
import React from "react";

const UpdateProductPage = () => {
  const params = useParams();
  return (
    <div className="px-4 md:px-12 bg-slate-800 pb-8">
      <h2 className="text-center font-semibold pt-8 text-xl md:text-2xl w-full max-w-xl mx-auto text-white">
        Update Product
      </h2>
      <UpdateForm productId={params.productId as string}></UpdateForm>
    </div>
  );
};

export default UpdateProductPage;
