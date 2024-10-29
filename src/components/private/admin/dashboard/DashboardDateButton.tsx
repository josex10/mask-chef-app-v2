"use client";

const DashboardDateButton = () => {
  const handleClick = async (e: any) => {
    console.log("click");
  };
  return (
    <form action={handleClick}>
      <input type="hidden" value={""} name="color" />
      <button type="submit">Prev</button>
    </form>
  );
};

export default DashboardDateButton;
