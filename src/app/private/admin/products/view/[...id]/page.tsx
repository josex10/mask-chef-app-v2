import React from "react";

const ProductEditPage = ({ params }: { params: { id: string } }) => {
  console.log(params);
  return (
    <section className="grid grid-cols-2 bg-green-400 h-full">
      <div className="bg-orange-800">Form</div>
      <div>
        <div className="bg-yellow-600">Inventory</div>
        <div className="bg-blue-400">Price History</div>
      </div>
    </section>
  );
};

export default ProductEditPage;
