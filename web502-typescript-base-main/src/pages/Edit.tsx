import axios from "axios";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type FormInputs = {
  title: string;
  poster: string;
  duration: number;
  category: string;
};

function EditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    const getDetail = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/m-ovies/${id}`);
        reset(data); // Đổ dữ liệu vào form
      } catch (error) {
        toast.error("Không tìm thấy phim!");
      }
    };
    getDetail();
  }, [id]);

  const onSubmit: SubmitHandler<FormInputs> = async (values) => {
    try {
      await axios.put(`http://localhost:3000/movies/${id}`, values);
      toast.success("Cập nhật thành công!");
      nav("/list");
    } catch (error) {
      toast.error("Lỗi cập nhật!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cập nhật phim</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Tên bộ phim</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", {
              required: "Tên không được để trống",
              minLength: { value: 3, message: "> 3 ký tự" },
            })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Poster */}
        <div>
          <label className="block font-medium mb-1">Link ảnh Poster</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("poster", { required: "Cần nhập link ảnh" })}
          />
          {errors.poster && (
            <span className="text-red-500 text-sm">
              {errors.poster.message}
            </span>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium mb-1">Thời lượng (phút)</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("duration", {
              required: "Cần nhập thời lượng",
              valueAsNumber: true,
              min: { value: 0, message: "> 0" },
            })}
          />
          {errors.duration && (
            <span className="text-red-500 text-sm">
              {errors.duration.message}
            </span>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Thể loại</label>
          <select
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("category")}
          >
            <option value="Hành động">Hành động</option>
            <option value="Viễn tưởng">Viễn tưởng</option>
            <option value="Hoạt hình">Hoạt hình</option>
            <option value="Tình cảm">Tình cảm</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full"
        >
          Lưu cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditPage;
