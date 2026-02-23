import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type Movie = {
  id: number;
  title: string;
  poster: string;
  duration: number;
  category: string;
};

function ListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/movies");
        setMovies(data);
      } catch (error) {
        console.log("Lỗi API:", error);
      }
    };
    getAll();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Bệ hạ chắc chắn muốn xóa phim này chứ?")) {
      try {
        await axios.delete(`http://localhost:3000/movies/${id}`);
        setMovies(movies.filter((movie) => movie.id !== id));
        toast.success("Xoá thành công");
      } catch (error) {
        toast.error("Xoá thất bại");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Danh sách Phim</h1>
        <Link
          to="/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          + Thêm mới
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border border-gray-300 text-left">
                Tiêu đề
              </th>
              <th className="px-4 py-3 border border-gray-300 text-left">
                Poster
              </th>
              <th className="px-4 py-3 border border-gray-300 text-left">
                Thời lượng
              </th>
              <th className="px-4 py-3 border border-gray-300 text-left">
                Thể loại
              </th>
              <th className="px-4 py-3 border border-gray-300 text-left">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="hover:bg-gray-50 border-b">
                <td className="px-4 py-2 border border-gray-300 font-medium text-blue-700">
                  {movie.title}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {movie.duration} phút
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <span className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {movie.category}
                  </span>
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex gap-2">
                    <Link
                      to={`/edit/${movie.id}`}
                      className="text-yellow-600 hover:text-yellow-800 font-medium underline"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="text-red-600 hover:text-red-800 font-medium underline"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
