async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  console.log(id);
}

export default page;
