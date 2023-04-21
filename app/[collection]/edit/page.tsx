import { getCollection } from "../page";
import Edit from "@/components/Edit";

export default async function EditPage({
  params,
}: {
  params: { collection: string };
}) {
  if (params.collection === "new")
    return (
      <Edit
        collection={{
          title: "",
          id: "1",
          editedAt: new Date().toUTCString(),
          colors: [],
        }}
        colors={[]}
      />
    );

  const collection = await getCollection(params.collection);
  const colors = collection.colors.map((obj) => {
    return {
      isEdit: false,
      isDelete: false,
      isNew: false,
      ...obj,
    };
  });
  return <Edit collection={collection} colors={colors} />;
}
