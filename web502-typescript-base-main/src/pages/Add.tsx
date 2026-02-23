import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormInputs = {
  title: string;
  poster: string;
  duration: number;
  category: string;
};

function AddPage() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (values) => {
    try {
      await axios.post("http://localhost:3000/movies", values);
      toast.success("Thêm phim mới thành công!");
      nav("/list"); // Chuyển về danh sách
    } catch (error) {
      toast.error("Lỗi khi thêm mới!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm phim mới</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* --- Tên phim --- */}
        <div>
          <label className="block font-medium mb-1">Tên bộ phim</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên phim..."
            {...register("title", {
              required: "Tên không được để trống",
              minLength: { value: 3, message: "Tên phải > 3 ký tự" },
            })}
          />
          {/* Hiện lỗi màu đỏ nếu có */}
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* --- Poster --- */}
        <div>
          <label className="block font-medium mb-1">Link ảnh Poster</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="http://..."
            {...register("poster", { required: "Cần nhập link ảnh" })}
          />
          {errors.poster && (
            <span className="text-red-500 text-sm">
              {errors.poster.message}
            </span>
          )}
        </div>

        {/* --- Thời lượng --- */}
        <div>
          <label className="block font-medium mb-1">Thời lượng (phút)</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("duration", {
              required: "Cần nhập thời lượng",
              valueAsNumber: true,
              min: { value: 0, message: "Thời lượng phải > 0" },
            })}
          />
          {errors.duration && (
            <span className="text-red-500 text-sm">
              {errors.duration.message}
            </span>
          )}
        </div>

        {/* --- Thể loại (Select) --- */}
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

        {/* --- Nút Submit --- */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
        >
          Thêm mới phim
        </button>
      </form>
    </div>
  );
}

export default AddPage;
