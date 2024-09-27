// import { UserAuth } from '@/types/TAuth';
import { NextPage } from 'next';
import { cookies } from 'next/headers';

import ContentLayout from '@/components/layout/ContentLayout';
import { LinkFinder } from '@/components/layout/navbar/LinkFinder';
import { SheetFavorites } from '@/components/layout/navbar/SheetFavorites';
import { SheetSaved } from '@/components/layout/navbar/SheetSaved';

import { FeedCard } from './components/feedCard/FeedCard';

// import { CheckBoxForm } from '@/components/common/checkboxForm/checkBoxForm';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  // const initialData = {
  //   LicensesTypes: {
  //     Transportation: { checked: false, label: "Transportation" },
  //     Cultivation: { checked: false, label: "Cultivation" },
  //     Testing: { checked: false, label: "Testing" },
  //     ProductManufacturer: { checked: false, label: "Product Manufacturer" },
  //     Retails: { checked: false, label: "Retails" },
  //     Delivery: { checked: false, label: "Delivery" },
  //     Testing2: { checked: false, label: "Testing" },
  //     Operators: { checked: false, label: "Operators" },
  //   },
  //   AncillaryBusinessType: {
  //     PointsOfSales: { checked: false, label: "Points of Sales" },
  //     HR: { checked: false, label: "HR" },
  //     Nutrients: { checked: false, label: "Nutrients" },
  //     PestControl: { checked: false, label: "Pest Control" },
  //     Consulting: { checked: false, label: "Consulting" },
  //     HVAC: { checked: false, label: "HVAC" },
  //     Lightning: { checked: false, label: "Lightning" },
  //     Technology: { checked: false, label: "Technology" },
  //     Packaging: { checked: false, label: "Packaging" },
  //     Transportation: { checked: false, label: "Transportation" },
  //     PPE: { checked: false, label: "PPE" },
  //     Media: { checked: false, label: "Media" },
  //     Security: { checked: false, label: "Security" },
  //     Lawyers: { checked: false, label: "Lawyers" },
  //     Equipments: { checked: false, label: "Equipments" },
  //     Manufacturers: { checked: false, label: "Manufacturers" },
  //     Genetics: { checked: false, label: "Genetics" },
  //   },
  // };
  // Recuperar el cookie del usuario
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user')?.value;

  if (!userCookie) {
    return <div>No user data found</div>;
  }

  // const user: UserAuth = JSON.parse(userCookie);

  return (
    <ContentLayout title='Welcome'>
      <div className='flex flex-col rounded-lg bg-white shadow-md'>
        <div className='flex justify-between gap-5 pl-5 pr-5 pt-5 lg:hidden'>
          <LinkFinder />
          <SheetSaved />
          <SheetFavorites />
        </div>
        {/* <h1>Hola {user.name ? user.name : user.email}, estás validado</h1> */}
        <p className='m-5 text-lg font-bold'>Activity Feeds</p>
        <hr className='w-100' />
        <FeedCard />
      </div>
    </ContentLayout>
  );
};

export default Page;
