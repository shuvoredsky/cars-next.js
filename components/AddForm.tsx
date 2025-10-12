"use client";

import { addAction } from "@/utils/addAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const AddForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [imageURL, setImageURL] = useState("");
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && user) {
      console.log("User session loaded:", user);
      setIsUserLoaded(true);
    } else if (status === "unauthenticated") {
      toast.error("Please log in to add a product");
      setIsUserLoaded(false);
    }
  }, [status, user]);

  async function clientAddAction(formData: FormData) {
    if (!isUserLoaded) {
      toast.error("User data is not loaded yet. Please wait.");
      return;
    }

    if (user) {
      formData.append("userName", user.name || "");
      formData.append("userEmail", user.email || "");

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    } else {
      console.log("No user session found");
      toast.error("User not authenticated");
      return;
    }

    const { error, success } = await addAction(formData);
    console.log("Server response:", { error, success });
    if (error) {
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
      className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5"
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
      <div className="flex flex-col w-full">
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
          placeholder="Enter the product name"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Price: </label>
        <input
          type="number"
          name="price"
          placeholder="Enter the price"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Seller's Link: </label>
        <input
          type="text"
          name="link"
          placeholder="Link to where buyers can find you"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Description: </label>
        <textarea
          name="description"
          placeholder="Enter the product description"
          rows={4}
          className="px-3 py-1.5 md:py-2 text-black rounded-lg bg-white"
        ></textarea>
      </div>

      <button className="w-full bg-slate-400 text-white px-4 py-2 rounded cursor-pointer">
        Add Product
      </button>
    </form>
  );
};

export default AddForm;
