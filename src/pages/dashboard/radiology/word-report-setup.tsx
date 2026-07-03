import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FormInput, FormTextArea, SelectInput } from '../../../components/form/FormInput';

const fieldPositions = [
  { value: '0', label: 'Hidden' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
];

const fonts = [
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Times New Roman', label: 'Times New Roman' },
];

const signStyles = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Bold', label: 'Bold' },
  { value: 'Italic', label: 'Italic' },
];

export default function RadiologyWordReportSetupPage() {
  const navigate = useNavigate();
  const [pageHeader, setPageHeader] = useState('C:\\Users\\Public\\Pictures\\Sample Pictures\\Chrysanthemum.jpg');
  const [bookingDatePosition, setBookingDatePosition] = useState('2');
  const [bookingTimePosition, setBookingTimePosition] = useState('4');
  const [centrePosition, setCentrePosition] = useState('1');
  const [regNoPosition, setRegNoPosition] = useState('6');
  const [patientPosition, setPatientPosition] = useState('3');
  const [ageSexPosition, setAgeSexPosition] = useState('5');
  const [doctorPosition, setDoctorPosition] = useState('7');
  const [samplePosition, setSamplePosition] = useState('0');
  const [resultDatePosition, setResultDatePosition] = useState('0');
  const [takenFromPosition, setTakenFromPosition] = useState('0');
  const [resultTimePosition, setResultTimePosition] = useState('0');
  const [uidPosition, setUidPosition] = useState('0');
  const [recordNoPosition, setRecordNoPosition] = useState('0');
  const [footerText, setFooterText] = useState('End Of Report\n~ End Of Report ~\nSignatures');
  const [topMargin, setTopMargin] = useState('230');
  const [bottomMargin, setBottomMargin] = useState('90');
  const [leftMargin, setLeftMargin] = useState('70');
  const [rightMargin, setRightMargin] = useState('60');
  const [headerMargin, setHeaderMargin] = useState('120');
  const [fontName, setFontName] = useState('Tahoma');
  const [fontSize, setFontSize] = useState('9');
  const [signStyle, setSignStyle] = useState('Bold');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Word Report Page Setup</h2>
        <p className="mt-2 text-sm text-slate-500">Configure how radiology reports are laid out for print output.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.55fr_0.45fr]">
        <Card title="Page Header Section">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Page Header"
              value={pageHeader}
              onChange={(event) => setPageHeader(event.target.value)}
            />
            <SelectInput
              label="Booking Date"
              options={fieldPositions}
              value={bookingDatePosition}
              onChange={(event) => setBookingDatePosition(event.target.value)}
            />
            <SelectInput
              label="Booking Time"
              options={fieldPositions}
              value={bookingTimePosition}
              onChange={(event) => setBookingTimePosition(event.target.value)}
            />
            <SelectInput
              label="Centre"
              options={fieldPositions}
              value={centrePosition}
              onChange={(event) => setCentrePosition(event.target.value)}
            />
            <SelectInput
              label="Reg No"
              options={fieldPositions}
              value={regNoPosition}
              onChange={(event) => setRegNoPosition(event.target.value)}
            />
            <SelectInput
              label="Patient Name"
              options={fieldPositions}
              value={patientPosition}
              onChange={(event) => setPatientPosition(event.target.value)}
            />
            <SelectInput
              label="Age/Sex"
              options={fieldPositions}
              value={ageSexPosition}
              onChange={(event) => setAgeSexPosition(event.target.value)}
            />
            <SelectInput
              label="Doctor"
              options={fieldPositions}
              value={doctorPosition}
              onChange={(event) => setDoctorPosition(event.target.value)}
            />
            <SelectInput
              label="Sample"
              options={fieldPositions}
              value={samplePosition}
              onChange={(event) => setSamplePosition(event.target.value)}
            />
            <SelectInput
              label="Result Date"
              options={fieldPositions}
              value={resultDatePosition}
              onChange={(event) => setResultDatePosition(event.target.value)}
            />
            <SelectInput
              label="Taken From"
              options={fieldPositions}
              value={takenFromPosition}
              onChange={(event) => setTakenFromPosition(event.target.value)}
            />
            <SelectInput
              label="Result Time"
              options={fieldPositions}
              value={resultTimePosition}
              onChange={(event) => setResultTimePosition(event.target.value)}
            />
            <SelectInput
              label="UID"
              options={fieldPositions}
              value={uidPosition}
              onChange={(event) => setUidPosition(event.target.value)}
            />
            <SelectInput
              label="Record No"
              options={fieldPositions}
              value={recordNoPosition}
              onChange={(event) => setRecordNoPosition(event.target.value)}
            />
          </div>
        </Card>

        <Card title="Report Footer Section">
          <FormTextArea
            label="Footer Text"
            rows={8}
            value={footerText}
            onChange={(event) => setFooterText(event.target.value)}
          />
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.55fr_0.45fr]">
        <Card title="Page Margin Section">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput label="Top" type="number" value={topMargin} onChange={(event) => setTopMargin(event.target.value)} />
            <FormInput label="Bottom" type="number" value={bottomMargin} onChange={(event) => setBottomMargin(event.target.value)} />
            <FormInput label="Left" type="number" value={leftMargin} onChange={(event) => setLeftMargin(event.target.value)} />
            <FormInput label="Right" type="number" value={rightMargin} onChange={(event) => setRightMargin(event.target.value)} />
            <FormInput label="Header Margin" type="number" value={headerMargin} onChange={(event) => setHeaderMargin(event.target.value)} />
            <SelectInput
              label="Font Name"
              options={fonts}
              value={fontName}
              onChange={(event) => setFontName(event.target.value)}
            />
            <FormInput label="Font Size" type="number" value={fontSize} onChange={(event) => setFontSize(event.target.value)} />
            <SelectInput
              label="Sign. Style"
              options={signStyles}
              value={signStyle}
              onChange={(event) => setSignStyle(event.target.value)}
            />
          </div>
        </Card>

        <Card title="Actions">
          <div className="space-y-3">
            <Button type="button" className="w-full" onClick={() => alert('Report layout saved')}>
              Save
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={() => navigate('/dashboard')}>
              Exit
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
