import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TrashIcon from "../../../assets/icons/trash.svg";
import useJwtToken from "../../../hooks/useJwtToken";

const UserTab = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(useSelector((state) => state.current_user));
	const { getJwtToken } = useJwtToken();

	const handleUsers = async () => {
		let response = await fetch(
			"https://api-master-lamainverte.herokuapp.com/api/users",
		);
		let json = await response.json();

		setUsers(json);
	};

	const deleteUser = async (user_id) => {
		await fetch(
			`https://api-master-lamainverte.herokuapp.com/api/users/${user_id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authentication: getJwtToken,
				},
			},
		);
		handleUsers();
	};

	useEffect(() => {
		handleUsers();
	}, []);

	return (
		<div className="align-middle inline-block min-w-full overflow-hidden bg-white px-8 pt-3 rounded-bl-lg rounded-br-lg">
			<table className="min-w-full">
				<thead>
					<tr>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
							#
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							First name
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Last name
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Email
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Is_admin
						</th>
					</tr>
				</thead>
				<tbody>
					{users?.map((user) => (
						<tr>
							<th scope="row">{user.id}</th>
							<td>{user.first_name}</td>
							<td>{user.last_name}</td>
							<td>{user.email}</td>
							<td>{user.is_admin ? "true" : "false"}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTab;
