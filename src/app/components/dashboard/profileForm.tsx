import InputField from "../project/InputField";
import PhoneInput from "../project/phoneNumber";

type FormDataType = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
};

type Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProfileForm({
  formData,
  setFormData,
  phone,
  setPhone,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="First name"
        />
        <InputField
          label="Middle Name"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          required
          placeholder="Middle name"
        />
      </div>

      <InputField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        placeholder="Last name"
        className="w-full"
      />

      <InputField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        className="w-full"
      />

      <PhoneInput value={phone} onChange={setPhone} className="w-full" />
    </div>
  );
}
