const { PrismaClient } = require("@prisma/client");
const { placeholderJobs } = require("./placeholder-data");
const prismaclient = new PrismaClient();

async function main() {
  await Promise.all(
    placeholderJobs.map(async (job) => {
      await prismaclient.job.upsert({
        where: {
          slug: job.slug,
        },
        update: job,
        create: job,
      });
    }),
  );
}

main()
  .then(async () => {
    await prismaclient.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await prismaclient.$disconnect();
    process.exit(1);
  });
