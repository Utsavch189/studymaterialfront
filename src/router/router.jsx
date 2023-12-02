import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../layout/App";
import Register from "../page/Register";
import Login from "../page/Login";
import Post from "../page/Post";
import Section from "../page/Section";

const router = createBrowserRouter(
	
	createRoutesFromElements(
		<>
			<Route path="/" element={<App />}>
				<Route path="/" element={<Section />} />
				<Route path="posts/:id" element={<Post />} />
			</Route>

			<Route path="register" element={<Register />} />
			<Route path="login" element={<Login />} />
			
		</>
	)
);

export default router;