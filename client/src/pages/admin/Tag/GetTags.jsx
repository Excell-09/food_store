import Loading from "@/components/Loading";
import appAxiosToken from "@/utils/AppAxiosToken";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import React from "react";

function TagItem({ tag }) {
  return (
    <div className="bg-white rounded-md font-medium p-5 shadow-md flex justify-between items-center">
      <p>{tag}</p>
      <div className="space-x-3">
        <Button>Update</Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function GetTags() {
  const tags = useQuery({
    queryKey: ["getTag"],
    queryFn: async () => appAxiosToken("/api/tag"),
  });

  if (tags.isLoading) {
    return (
      <section className="text-center">
        <Loading />
      </section>
    );
  }

  if (tags.data.data.length === 0) {
    return <section>0 tag item</section>;
  }

  return (
    <section>
      <h6 className="text-lg mb-3">Tags List</h6>
      <div className="space-y-2">
        {tags.data.data.map((item) => (
          <TagItem key={item._id} tag={item.name} />
        ))}
      </div>
    </section>
  );
}
