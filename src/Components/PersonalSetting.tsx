import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { supabase } from "../supabase";
import { Button, Form } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import "./PersonalSetting.css";

const UserProfileEditor: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sex: "",
    birthday: "",
    occupation: "",
    profilePicture: null as File | null,
    profilePictureUrl: "",
  });

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData((prev) => ({
            ...prev,
            name: data.name || "",
            email: firebaseUser.email || "",
            sex: data.sex || "",
            birthday: data.birthday || "",
            occupation: data.occupation || "",
            profilePictureUrl: data.profilePicture || "", // Fetch current profile picture URL
          }));
        }
      }
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, [name]: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadProfilePicture = async (
    file: File,
    userId: string
  ): Promise<string> => {
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (!["jpg", "jpeg", "webp", "png"].includes(fileExt || "")) {
      alert("Only JPG, PNG, or WebP files are allowed.");
      throw new Error("Invalid file type");
    }

    const fileName = `${userId}.${fileExt}`;
    const { error } = await supabase.storage
      .from("profile-pictures")
      .upload(fileName, file, { upsert: true });

    if (error) throw error;

    return `https://ljlidhwudeguxkyqqzup.supabase.co/storage/v1/object/public/profile-pictures/${fileName}`;
  };

  const handleSave = async () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    try {
      let profilePicUrl = formData.profilePictureUrl;

      if (formData.profilePicture) {
        profilePicUrl = await uploadProfilePicture(
          formData.profilePicture,
          user.uid
        );
      }

      const updateData: any = {
        name: formData.name,
        sex: formData.sex,
        birthday: formData.birthday,
        occupation: formData.occupation,
        profilePicture: profilePicUrl,
      };

      await updateDoc(userRef, updateData);

      alert("Profile updated successfully.");
      window.location.reload(); // Refresh the page after updating
    } catch (error: any) {
      alert("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Profile Picture</Form.Label>
          <div className="profile-picture-container">
            <img
              src={
                formData.profilePicture
                  ? URL.createObjectURL(formData.profilePicture)
                  : formData.profilePictureUrl || "default-avatar.png"
              }
              alt="Profile"
              className="profile-picture"
              onClick={() => document.getElementById("fileInput")?.click()}
            />
            <Form.Control
              id="fileInput"
              type="file"
              name="profilePicture"
              accept=".jpg,.jpeg,.webp,.png" // Restrict file types
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <div className="edit-icon">
              <FaPen className="edit-icon-image" />
            </div>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={formData.email} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sex</Form.Label>
          <Form.Select name="sex" value={formData.sex} onChange={handleChange}>
            <option>Other</option>
            <option>Male</option>
            <option>Female</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Occupation</Form.Label>
          <Form.Select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          >
            <option>Student</option>
            <option>Worker</option>
            <option>Work from Home</option>
            <option>Unemployed</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default UserProfileEditor;
