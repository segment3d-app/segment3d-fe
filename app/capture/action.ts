"use server";

import { Asset } from "@/model/asset";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";

export async function removeAsset(id: string): Promise<Asset> {
  "use server";
  try {
    const { data } = await serverAxios.delete<{ asset: Asset }>(
      `/api/assets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      },
    );
    return data.asset;
  } catch (error) {
    throw error;
  }
}

export async function getMyAsset(
  search: string,
  filter: string[],
): Promise<Asset[]> {
  "use server";
  try {
    const params = new URLSearchParams();

    if (search) {
      params.append("keyword", search);
    }

    if (filter?.length) {
      params.append("filter", filter.join(","));
    }

    let url = `/api/assets/me?${params.toString()}`;
    const { data } = await serverAxios.get<{ assets: Asset[] }>(url, {
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });

    return data.assets;
  } catch (error) {
    throw error;
  }
}
