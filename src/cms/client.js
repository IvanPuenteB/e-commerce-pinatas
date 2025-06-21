import { SanityClient } from "@sanity/client";

export const client = SanityClient({
    projectId: "your_project_id",
    dataset: "your_dataset_name",
    useCdn: true,
    apiVersion: "2025-18-06", // Use a specific API version
})