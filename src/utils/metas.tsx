import Head from "next/head";

export const Metas = () => {
  return (
    <Head>
      <meta
        name="title"
        content={process.env.NEXT_PUBLIC_PROJECT_NAME ?? "Ape"}
      />
      <meta
        name="description"
        content={process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION}
      />
      <meta
        name="keywords"
        content="Ape coin, ape coin delegation, delegation, ape"
      />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="nooobmaster19" />
    </Head>
  );
};
