import Loading from "@/components/Loading";
import appAxiosToken from "@/utils/AppAxiosToken";
import { Button, Pagination } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const Addresses = React.lazy(() => import("./Addresses"));

export default function Alamat() {
  const [addresses, setAddresses] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    appAxiosToken(`/api/delivery-address?skip=${(currentPage - 1) * 10}`).then(({ data }) => {
      setAddresses(data.data);
      setTotalPage(data.count);
    });
  }, []);

  return (
    <div>
      <div>
        <Link to={"/account/add"}>
          <Button type="primary" className="bg-blue-500">
            Tambah Alamat
          </Button>
        </Link>
      </div>
      <div className="mt-5">
        <React.Suspense fallback={<Loading center />}>
          <Addresses
            addresses={addresses}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        </React.Suspense>
      </div>
    </div>
  );
}
