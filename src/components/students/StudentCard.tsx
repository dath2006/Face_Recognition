import React from "react";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Student } from "../../types/student";
import { getImageUrl } from "../../utils/imageUtils";

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={getImageUrl(student.photo)}
              alt={student.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
            />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-500">#{student.registerNo}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {student.class}-{student.section}
            </span>
          </div>
        </div>
        <Link
          to={`/teacher/edit-student/${student._id}`}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors duration-200"
        >
          <Edit className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default StudentCard;
