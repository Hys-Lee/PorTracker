import { redirect } from 'next/navigation';

export default async function Default() {
  //   notFound();
  //   return <>안쪽</>;
  redirect('/portfolios/actual');
}
