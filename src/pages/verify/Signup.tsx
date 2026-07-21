import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FlaskConical, ArrowRight, AlertCircle, CheckCircle2, EyeOffIcon, EyeIcon } from 'lucide-react';
import { fetchProfile, registerUser } from '../../features/auth/authSlice';
import { AppDispatch, RootState } from '../../app/store';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../utils/constants';
import { signupSchema, type SignupFormValues } from '../../shared/validation';

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading, profileLoading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      // organization
      labName: '',
      labCode: '',
      registrationNumber: '',
      gstNumber: '',
      // admin
      fullName: '',
      email: '',
      mobileNumber: '',
      designation: 'Owner',
      // credentials
      username: '',
      password: '',
      confirmPassword: '',
      // address
      country: '',
      state: '',
      city: '',
      pinCode: '',
      completeAddress: '',
      // subscription
      plan: 'Starter',
      // security
      terms: false,
      privacy: false,
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    // Send full signup form to backend register API (map `fullName` -> `name`).
    const payload = {
      name: values.fullName,
      email: values.email,
      password: values.password,
      labName: values.labName,
      labCode: values.labCode,
      registrationNumber: values.registrationNumber,
      gstNumber: values.gstNumber,
      mobileNumber: values.mobileNumber,
      designation: values.designation,
      username: values.username,
      country: values.country,
      state: values.state,
      city: values.city,
      pinCode: values.pinCode,
      completeAddress: values.completeAddress,
      plan: values.plan,
      terms: values.terms,
      privacy: values.privacy,
    };

    const result = await dispatch(registerUser(payload));

    if (registerUser.fulfilled.match(result)) {
      const profileResult = await dispatch(fetchProfile());
      if (fetchProfile.fulfilled.match(profileResult)) {
        navigate(ROUTES.DASHBOARD);
      }
    }
  };

  const fillSampleData = () => {
    reset({
      labName: 'PathCare Labs',
      labCode: 'PCL001',
      registrationNumber: 'NABL-1234',
      gstNumber: '27AABCU9603R1ZV',
      fullName: 'Dr. Neeshu Kumar',
      email: 'admin@pathcare.com',
      mobileNumber: '+919876543210',
      designation: 'Administrator',
      username: 'admin@pathcare.com',
      password: 'Admin@12345!',
      confirmPassword: 'Admin@12345!',
      country: 'India',
      state: 'Uttar Pradesh',
      city: 'Meerut',
      pinCode: '250342',
      completeAddress: 'Rajpur Momin',
      plan: 'Starter',
      terms: true,
      privacy: true,
    });
  };

  const createWithSample = async () => {
    fillSampleData();
    await handleSubmit(onSubmit)();
  };

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="px-10 pt-12 pb-8 text-center text-slate-900 leading-none">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200 mb-8 transform -rotate-6 transition-transform hover:rotate-0">
              <FlaskConical size={32} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Create Your <span className="text-indigo-600 font-medium italic">PathoCare</span> account</h1>
            <p className="mt-3 text-slate-500 font-medium text-sm">Start with your lab credentials and get access to the dashboard.</p>
          </div>

          <div className="px-10 pb-12">
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Registration failed</p>
                  <p className="mt-1 text-red-600">{error}</p>
                </div>
              </div>
            )}

            {profileLoading && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>Creating account and loading profile…</span>
              </div>
            )}

            <div className="mb-4 flex items-center justify-end gap-3">
              <button type="button" onClick={fillSampleData} className="text-sm text-indigo-600 hover:underline">Fill sample data</button>
              <Button type="button" onClick={createWithSample} className="h-10 px-4" isLoading={isSubmitting || loading || profileLoading}>
                Create with sample
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Organization / Lab details */}
              <Input label="Pathology / Lab Name *" placeholder="PathCare Labs" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('labName')} error={errors.labName?.message} />

              <div className="grid grid-cols-2 gap-3">
                <Input label="Lab Code (Optional)" placeholder="PCL001" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('labCode')} error={errors.labCode?.message} />
                <Input label="Registration Number *" placeholder="Medical Council / NABL Registration" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('registrationNumber')} error={errors.registrationNumber?.message} />
              </div>

              <Input label="GST Number (Optional)" placeholder="GSTIN" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('gstNumber')} error={errors.gstNumber?.message} />

              {/* Admin information */}
              <Input label="Full Name *" placeholder="Dr. Neeshu Kumar" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('fullName')} error={errors.fullName?.message} />

              <Input label="Email Address *" placeholder="admin@pathcare.com" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('email')} error={errors.email?.message} />

              <div className="grid grid-cols-2 gap-3">
                <Input label="Mobile Number *" placeholder="+91 9876543210" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('mobileNumber')} error={errors.mobileNumber?.message} />

                <div className="w-full space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Designation *</label>
                  <select {...register('designation')} className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Owner</option>
                    <option>Administrator</option>
                    <option>Lab Director</option>
                    <option>Manager</option>
                  </select>
                  {errors.designation && <p className="text-xs text-red-500 font-medium">{String(errors.designation?.message)}</p>}
                </div>
              </div>

              {/* Login credentials */}
              <Input label="Username *" placeholder="admin" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('username')} error={errors.username?.message} />

              <Input
                label="Password *"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="h-12 border-slate-200 focus:ring-indigo-500"
                rightIcon={showPassword ? EyeIcon : EyeOffIcon}
                onRightIconClick={() => setShowPassword((prev) => !prev)}
                {...register('password')}
                error={errors.password?.message}
                helperText={"Minimum 8 chars, include upper, lower, number, special"}
              />

              <Input label="Confirm Password *" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('confirmPassword')} error={errors.confirmPassword?.message} />

              {/* Address */}
              <div className="grid grid-cols-2 gap-3">
                <Input label="Country *" placeholder="India" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('country')} error={errors.country?.message} />
                <Input label="State *" placeholder="Karnataka" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('state')} error={errors.state?.message} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input label="City *" placeholder="Bengaluru" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('city')} error={errors.city?.message} />
                <Input label="Pin Code *" placeholder="560001" className="h-12 border-slate-200 focus:ring-indigo-500" {...register('pinCode')} error={errors.pinCode?.message} />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700">Complete Address *</label>
                <input {...register('completeAddress')} placeholder="Street, area, landmark, building" className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                {errors.completeAddress && <p className="text-xs text-red-500 font-medium">{String(errors.completeAddress?.message)}</p>}
              </div>

              {/* Subscription */}
              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700">Plan</label>
                <select {...register('plan')} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Starter</option>
                  <option>Professional</option>
                  <option>Enterprise</option>
                </select>
              </div>

              {/* Security / consents */}
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register('terms')} className="h-4 w-4 rounded border-slate-200 text-indigo-600" />
                  <span className="text-sm text-slate-700">I agree to Terms & Conditions</span>
                </label>
                {errors.terms && <p className="text-xs text-red-500 font-medium">{String(errors.terms?.message)}</p>}

                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register('privacy')} className="h-4 w-4 rounded border-slate-200 text-indigo-600" />
                  <span className="text-sm text-slate-700">I agree to Privacy Policy</span>
                </label>
                {errors.privacy && <p className="text-xs text-red-500 font-medium">{String(errors.privacy?.message)}</p>}
              </div>

              <Button type="submit" className="w-full h-12 text-base font-bold gap-2 bg-indigo-600 hover:bg-indigo-700" isLoading={isSubmitting || loading || profileLoading}>
                Create account
                <ArrowRight size={18} />
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className="font-semibold text-indigo-600 hover:text-indigo-700">
                Sign in
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enterprise Pathology Network v2.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
