import { InMemorySiteRepository } from "./in-memory.repository.ts";
import { runSiteRepositoryContract } from "./site.repository.contract.ts";

runSiteRepositoryContract(
  "In-Memory Repository",
  () => new InMemorySiteRepository(),
);
