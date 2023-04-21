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
        colors={new Map()}
      />
    );

  const collection = await getCollection(params.collection);
  const map = new Map(
    collection.colors.map((obj) => [
      obj.id,
      {
        isEdit: false,
        isDelete: false,
        isNew: false,
        ...obj,
      },
    ])
  );
  return <Edit collection={collection} colors={map} />;
}
