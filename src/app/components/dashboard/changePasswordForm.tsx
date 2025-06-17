'use client';

import { useState } from 'react';
import Button from '../common/buttons';
import InputField from '../project/InputField';

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow flex flex-col gap-5 w-full max-w-xl"
      >
        <InputField
          label="Current Password"
          name="currentPassword"
          placeholder="Enter current password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          isPassword
          className="w-full"
        />
        <InputField
          label="New Password"
          name="newPassword"
          placeholder="Enter new password"
          value={formData.newPassword}
          onChange={handleChange}
          required
          isPassword
          className="w-full"
        />
        <InputField
          label="Confirm New Password"
          name="confirmPassword"
          placeholder="Re-enter new password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          isPassword
          className="w-full"
        />

        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="max-w-[299px]">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}


// 'use client';

// import { useState } from 'react';
// import Button from '../common/buttons';
// import InputField from '../project/InputField';
// import Alert from '../common/alert';

// export default function ChangePasswordForm() {
//   const [formData, setFormData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const [showAlert, setShowAlert] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formData);


//     setShowAlert(true); 
//   };

//   return (
//     <div className="relative w-full flex justify-center">
//       {/* Alert Component */}
//       <Alert
//         message="Your password has been updated successfully!"
//         variant="success"
//         show={showAlert}
//         onClose={() => setShowAlert(false)}
//         autoDismiss={3000}
//       />

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white border p-6 rounded-md shadow flex flex-col gap-5 w-full max-w-xl"
//       >
//         <InputField
//           label="Current Password"
//           name="currentPassword"
//           placeholder="Enter current password"
//           value={formData.currentPassword}
//           onChange={handleChange}
//           required
//           isPassword
//           className="w-full"
//         />
//         <InputField
//           label="New Password"
//           name="newPassword"
//           placeholder="Enter new password"
//           value={formData.newPassword}
//           onChange={handleChange}
//           required
//           isPassword
//           className="w-full"
//         />
//         <InputField
//           label="Confirm New Password"
//           name="confirmPassword"
//           placeholder="Re-enter new password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//           isPassword
//           className="w-full"
//         />

//         <div className="flex justify-end">
//           <Button type="submit" variant="primary" className="max-w-[299px]">
//             Save Changes
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
