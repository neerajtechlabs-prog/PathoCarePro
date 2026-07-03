import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FormInput } from '../../../components/form/FormInput';

export default function RadiologyPNDTEntryPage() {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState('1006');
  const [recordNo, setRecordNo] = useState('R-2026-102');
  const [patientName, setPatientName] = useState('Sunita Patel');
  const [ageSex, setAgeSex] = useState('32/F');
  const [fatherHusband, setFatherHusband] = useState('Rajesh Patel');
  const [phoneNo, setPhoneNo] = useState('9876543210');
  const [address, setAddress] = useState('Sector 12, Ahmedabad');
  const [lmp, setLmp] = useState('2026-04-20');
  const [gmp, setGmp] = useState('G2P1');
  const [pIndication, setPIndication] = useState('Routine antenatal scan');
  const [usgImpression, setUsgImpression] = useState('Live intrauterine pregnancy, single foetus.');
  const [relationWithPatient, setRelationWithPatient] = useState('Husband');
  const [attendedDoctor, setAttendedDoctor] = useState('Dr. Sharma');

  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput label="Reg No" value={regNo} onChange={(event) => setRegNo(event.target.value)} />
        <FormInput label="Record No" value={recordNo} onChange={(event) => setRecordNo(event.target.value)} />
        <FormInput label="Patient Name" value={patientName} onChange={(event) => setPatientName(event.target.value)} />
        <FormInput label="Age/Sex" value={ageSex} onChange={(event) => setAgeSex(event.target.value)} />
        <FormInput label="Father/Husband" value={fatherHusband} onChange={(event) => setFatherHusband(event.target.value)} />
        <FormInput label="Phone No" value={phoneNo} onChange={(event) => setPhoneNo(event.target.value)} />
        <FormInput label="Address" value={address} onChange={(event) => setAddress(event.target.value)} />
        <FormInput label="LMP" type="date" value={lmp} onChange={(event) => setLmp(event.target.value)} />
        <FormInput label="GMP" value={gmp} onChange={(event) => setGmp(event.target.value)} />
        <FormInput label="P Indication" value={pIndication} onChange={(event) => setPIndication(event.target.value)} />
        <FormInput label="Relation With Patient" value={relationWithPatient} onChange={(event) => setRelationWithPatient(event.target.value)} />
        <FormInput label="Attended Doctor" value={attendedDoctor} onChange={(event) => setAttendedDoctor(event.target.value)} />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">USG Impression</label>
        <textarea
          rows={8}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={usgImpression}
          onChange={(event) => setUsgImpression(event.target.value)}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" onClick={() => alert('CMO entry saved')}>
          Save
        </Button>
        <Button type="button" variant="outline" onClick={() => alert('Search not implemented')}>
          Search
        </Button>
        <Button type="button" variant="secondary" onClick={() => alert('Refresh not implemented')}>
          Refresh
        </Button>
        <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
          Exit
        </Button>
      </div>
    </Card>
  );
}
