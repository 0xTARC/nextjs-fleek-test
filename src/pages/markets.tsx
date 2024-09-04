
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Market() {
  const router = useRouter();
  const { market } = router.query;
  console.log("market: ", market);

  return <div>{market}</div>;
}