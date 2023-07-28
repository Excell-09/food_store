import Loading from "@/components/Loading";
import appAxiosToken from "@/utils/AppAxiosToken";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function TagItem({ tag }) {
  const handleDeleteTag = (id) =>
    appAxiosToken.delete("/api/tag/" + id).then((res) => {
      if (res.data.error === 1) {
        Promise.reject("Something wrong");
      }
    });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: handleDeleteTag,
    onSuccess: () => queryClient.invalidateQueries(["tag"]),
  });

  return (
    <div className="bg-white rounded-md font-medium p-5 shadow-md flex justify-between items-center">
      <p>{tag.name}</p>
      <div className="space-x-3">
        <Button
          onClick={() => {
            queryClient.setQueryData(["tag", tag._id], tag.name);
            navigate("/admin/tag/update/" + tag._id);
          }}
        >
          Update
        </Button>
        <Button
          loading={mutation.isLoading}
          onClick={() => mutation.mutate(tag._id)}
          type="primary"
          danger
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function GetTags() {
  const tags = useQuery({
    queryKey: ["tag"],
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
          <TagItem key={item._id} tag={item} />
        ))}
      </div>
    </section>
  );
}
