"use client";
import { updateAction } from "@/utils/updateAction";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  description: string;
  link: string;
}

const UpdateForm = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const [imageURL, setImageURL] = useState("");
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`/api/products/${productId}`).then((res) => {
      setProduct(res.data.product);
    });
  }, []);

  useEffect(() => {
    if (product) {
      setImageURL(product.image);
    }
  }, [product]);

  async function clientAddAction(formData: FormData) {
    const { error, success } = await updateAction(formData, productId);
    if (error) {
      // toast notification
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      router.push("/");

      setImageURL("");
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;
      if (Math.round(fileSize / 1024) > 1024) {
        toast.error("Image greater than 1mb is not allowed");
      } else {
        setImageURL(URL.createObjectURL(file));
      }
    }
  };
  return (
    <form
      action={clientAddAction}
      className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5 "
    >
      {imageURL && (
        <Image
          src={imageURL}
          alt="img"
          width={1000}
          height={1000}
          className="max-w-full max-h-72 object-cover object-center rounded-lg"
        />
      )}
      <div className="flex flex-col w-full ">
        <label>Product Image: </label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Product Name: </label>
        <input
          type="text"
          name="name"
          defaultValue={product?.name}
          placeholder="Enter the product name"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Price: </label>
        <input
          type="number"
          name="price"
          defaultValue={product?.price}
          placeholder="Enter the price"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Seller's Link: </label>
        <input
          type="text"
          name="link"
          defaultValue={product?.link}
          placeholder="Link to where buyers can find you"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Description: </label>
        <textarea
          name="description"
          defaultValue={product?.description}
          placeholder="Enter the product description"
          rows={4}
          className=" px-3 py-1.5 md:py-2 text-[#252422] rounded-lg border-gray-500"
        ></textarea>
      </div>

      <button className="w-full bg-black text-white px-4 py-2 rounded cursor-pointer">
        Update Product
      </button>
    </form>
  );
};

export default UpdateForm;
