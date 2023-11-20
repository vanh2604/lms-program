const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Lập trình web" },
        { name: "Lập trình fullstack" },
        { name: "Cấu trúc dữ liệu và giải thuật" },
        { name: "Lập trình di động" },
        { name: "Lập trình nhúng" },
        { name: "Trí tuệ nhân tạo và học máy" },
        { name: "Reactjs" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
