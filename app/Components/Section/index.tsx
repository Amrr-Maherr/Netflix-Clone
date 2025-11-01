import React from "react";

type IndexProps = {
  Data: object[]; // lowercase 'object' is more standard
};

export default function Index({ Data }: IndexProps) {
  return (
    <section className="container">
      <div className="grid grid-cols-2 md:grid-col4 lg:grid-cols-5 xl:grid-cols-6">
        
      </div>
    </section>
  );
}
