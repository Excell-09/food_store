import InputText from "@/components/Input/InputText";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputTextArea from "@/components/Input/InputTextArea";
import { Button } from "antd";
import InputSelect from "@/components/Input/InputSelect";
import appAxiosExternal from "@/utils/AppAxiosExternal";
import appAxiosToken from "@/utils/AppAxiosToken";
import { useNavigate } from "react-router-dom";

const shema = yup.object().shape({
  nama: yup.string().required("This Field Required"),
  kelurahan: yup.string().required("This Field Required"),
  kecamatan: yup.string().required("This Field Required"),
  kabupaten: yup.string().required("This Field Required"),
  provinsi: yup.string().required("This Field Required"),
  detail: yup.string().required("This Field Required"),
});

export default function AddAlamat() {
  const form = useForm({
    defaultValues: {
      nama: "",
      kelurahan: "",
      kecamatan: "",
      kabupaten: "",
      provinsi: "",
      detail: "",
    },
    resolver: yupResolver(shema),
  });
  const [provinsi, setProvinsi] = React.useState([]);
  const [kabupaten, setKabupaten] = React.useState([]);
  const [kecamatan, setKecamatan] = React.useState([]);
  const [kelurahan, setKelurahan] = React.useState([]);
  const [isloading, setIsloading] = React.useState(false);
  const navigate = useNavigate();

  const [provinsiField, setProvinsiField] = React.useState("");
  const [kabupatenField, setKabupatenField] = React.useState("");
  const [kecamatanField, setKecamatanField] = React.useState("");

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  React.useEffect(() => {
    appAxiosExternal("/provinsi").then(({ data }) => setProvinsi(data.provinsi));
  }, []);

  React.useEffect(() => {
    if (provinsiField) {
      appAxiosExternal("/kota?id_provinsi=" + provinsiField).then(({ data }) => setKabupaten(data.kota_kabupaten));
    }
  }, [provinsiField]);

  React.useEffect(() => {
    if (kabupatenField) {
      appAxiosExternal("kecamatan?id_kota=" + kabupatenField).then(({ data }) => setKecamatan(data.kecamatan));
    }
  }, [kabupatenField]);

  React.useEffect(() => {
    if (kecamatanField) {
      appAxiosExternal("kelurahan?id_kecamatan=" + kecamatanField).then(({ data }) => setKelurahan(data.kelurahan));
    }
  }, [kecamatanField]);

  const handleAddAddress = async (value) => {
    if (isloading) setIsloading(false);

    setIsloading(true);

    const valueModify = {
      ...value,
      provinsi: value.provinsi.split(",")[0],
      kelurahan: value.kelurahan.split(",")[0],
      kabupaten: value.kabupaten.split(",")[0],
      kecamatan: value.kecamatan.split(",")[0],
    };

    try {
      const res = await appAxiosToken.post("/api/delivery-address", valueModify);
      if (res.data.error !== 1) {
        navigate("/account/alamat");
      }
    } catch (error) {
    } finally {
      setIsloading(false);
    }
  };
  const handleEventChangeProvinsiField = (value) => setProvinsiField(value);
  const handleEventChangeKabupatenField = (value) => setKabupatenField(value);
  const handleEventChangeKecamatanField = (value) => setKecamatanField(value);
  const handleEventChangeKelurahanField = (value) => value;

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit(handleAddAddress)} className="flex flex-wrap max-sm:flex-col gap-3">
        <div className="flex-1 ">
          <InputText label={"Nama"} type={"text"} errorMessage={errors.nama?.message} register={register("nama")} />
          <InputTextArea
            label={"Detail"}
            type={"text"}
            errorMessage={errors.detail?.message}
            register={register("detail")}
          />
        </div>
        <div className="flex-1 ">
          <InputSelect
            eventChange={handleEventChangeProvinsiField}
            label={"Provinsi"}
            options={provinsi}
            errorMessage={errors.provinsi?.message}
            register={register("provinsi")}
          />
          <InputSelect
            disabled={!provinsiField}
            eventChange={handleEventChangeKabupatenField}
            label={"kabupaten"}
            options={kabupaten}
            errorMessage={errors.kabupaten?.message}
            register={register("kabupaten")}
          />
          <InputSelect
            disabled={!kabupatenField}
            eventChange={handleEventChangeKecamatanField}
            label={"Kecamatan"}
            options={kecamatan}
            errorMessage={errors.kecamatan?.message}
            register={register("kecamatan")}
          />
          <InputSelect
            disabled={!kecamatanField}
            eventChange={handleEventChangeKelurahanField}
            label={"Kelurahan"}
            options={kelurahan}
            errorMessage={errors.kelurahan?.message}
            register={register("kelurahan")}
          />
        </div>

        <Button loading={isloading} htmlType="submit" className="bg-blue-500 w-full" type="primary" block>
          Simpan
        </Button>
      </form>
    </div>
  );
}
