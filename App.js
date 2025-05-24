import { useParams } from "react-router-dom";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Card, CardContent } from './components/ui/card'
import { Progress } from './components/ui/progress'

const courses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React.js with hands-on examples.",
    videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
    progress: 65,
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into closures, async, and advanced topics.",
    videoUrl: "https://www.youtube.com/embed/PoRJizFvM7s",
    progress: 30,
  },
];

function CourseList() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map((course) => (
        <Card key={course.id} className="rounded-2xl shadow-md">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <Progress value={course.progress} className="mb-2" />
            <Link
              to={`/course/${course.id}`}
              className="text-blue-600 hover:underline"
            >
              View Course
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CoursePage({ id }) {
  const course = courses.find((c) => c.id === parseInt(id));
  if (!course) return <div className="p-6">Course not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
      <iframe
        width="100%"
        height="400"
        src={course.videoUrl}
        title="Course Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-xl mb-6"
      ></iframe>
      <Progress value={course.progress} className="mb-4" />
      <p className="text-gray-700">{course.description}</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow p-4 text-center font-bold text-xl">
          <Link to="/">E-Learning Platform</Link>
        </header>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route
            path="/course/:id"
            element={<CourseRouteWrapper />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function CourseRouteWrapper() {
  const { id } = useParams();
  return <CoursePage id={id} />;
}

export default App;