import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { FormRow } from "../components";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image (max 0.5 MB)
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="form-input"
              accept="images/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "update profile"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const avatar = formData.get("avatar");

  if (avatar && avatar.size > 500000) {
    console.log(avatar);
    return toast.error("Image size too large");
  }

  try {
    await customFetch.patch("/users/update-user/", formData);
    toast.success("User data updated!");
    return redirect("/dashboard");
  } catch (err) {
    return toast.error(err?.response?.data?.message);
  }
};

export default Profile;
