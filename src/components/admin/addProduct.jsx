import { useState, useEffect } from "react";
import api from "../service/axios";
import { useAuth } from "../service/AuthContext";

function ProductForm({ onSubmit, loading }) {
  const { pareantcategory } = useAuth();
  const [subCategories, setSubCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    subCategory: "",
    brand: "",
    basePrice: "",
    discountRate: "",
    productImage: null,
  });

  const fetchSubCategories = async (categoryId) => {
    if (!categoryId) return;

    const res = await api.get(`/subcategory/by-category/${categoryId}`);

    setSubCategories(res.data.subcategories);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "productImage") {
      setForm((prev) => ({ ...prev, productImage: files[0] }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "category") {
      fetchSubCategories(value); // value = categoryId ✅
      setForm((prev) => ({ ...prev, subCategory: "" }));
    }
  };

  const handleSubmit = () => {
    if (!form.name || !form.category || !form.productImage) {
      alert("Required fields missing");
      return;
    }

    const fd = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) fd.append(key, form[key]);
    });

    onSubmit(fd);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold">Product Details</h2>

      <input
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        className="input"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="input"
      >
        <option value="">Select Category</option>

        {pareantcategory?.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        name="subCategory"
        value={form.subCategory}
        onChange={handleChange}
        className="input"
      >
        <option value="">Select SubCategory</option>

        {subCategories.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>
      <input
        name="basePrice"
        type="text"
        placeholder="Base Price"
        onChange={handleChange}
        className="input"
      />
      <input
        name="discountRate"
        type="text"
        placeholder="Discount %"
        onChange={handleChange}
        className="input"
      />

      <input name="productImage" type="file" onChange={handleChange} />

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Save Product
      </button>
    </div>
  );
}

function VariantForm({ onSubmit, loading }) {
  const [variants, setVariants] = useState([]);

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        color: "",
        size: "",
        price: "",
        stock: "",
        images: [],
      },
    ]);
  };

  const updateVariant = (i, field, value) => {
    const copy = [...variants];
    copy[i][field] = value;
    setVariants(copy);
  };

  const addImages = (i, files) => {
    const copy = [...variants];
    copy[i].images = [...files];
    setVariants(copy);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-lg font-semibold">Variants</h2>

      {variants.map((v, i) => (
        <div key={i} className="border p-4 rounded space-y-2">
          <input
            placeholder="Color"
            onChange={(e) => updateVariant(i, "color", e.target.value)}
          />
          <input
            placeholder="Size"
            onChange={(e) => updateVariant(i, "size", e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => updateVariant(i, "price", e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock"
            onChange={(e) => updateVariant(i, "stock", e.target.value)}
          />
          <input
            type="file"
            multiple
            onChange={(e) => addImages(i, e.target.files)}
          />
        </div>
      ))}

      <button onClick={addVariant} className="border px-4 py-2 rounded">
        + Add Variant
      </button>

      <button
        disabled={loading || !variants.length}
        onClick={() => onSubmit(variants)}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Save Variants
      </button>
    </div>
  );
}

export const AddProductWithVariant = () => {
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProductCreate = async (formData) => {
    try {
      setLoading(true);
      const res = await api.post("/product/products", formData);
      setProductId(res.data.product._id);
      alert("Product created. Now add variants.");
    } catch (err) {
      alert(err.response?.data?.message || "Product create failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVariantsCreate = async (variants) => {
    try {
      setLoading(true);
      for (let v of variants) {
        const fd = new FormData();
        fd.append("color", v.color);
        fd.append("size", v.size);
        fd.append("price", v.price);
        fd.append("stock", v.stock);

        v.images.forEach((img) => fd.append("variantImages", img));

        await api.post(`/variant/admin/products/${productId}/variants`, fd);
      }
      alert("Product & variants added successfully");
    } catch (err) {
      alert("Variant creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">Add Product</h1>

      <ProductForm onSubmit={handleProductCreate} loading={loading} />

      {productId && (
        <VariantForm onSubmit={handleVariantsCreate} loading={loading} />
      )}
    </div>
  );
};
