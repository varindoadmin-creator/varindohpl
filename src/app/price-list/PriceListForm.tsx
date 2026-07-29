'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';

type Status = 'idle' | 'submitting' | 'error';

export function PriceListForm() {
  const router = useRouter();
  const { lang } = useLang();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const canSubmit = Boolean(name.trim() && phone.trim() && address.trim() && status !== 'submitting');

  async function submit() {
    if (!canSubmit) return;
    setStatus('submitting');
    setError('');
    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'price-list',
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setStatus('error');
        setError(result.error || (lang === 'id' ? 'Permintaan tidak dapat disimpan.' : 'Could not save your request.'));
        return;
      }
      router.push('/price-list/download');
    } catch {
      setStatus('error');
      setError(lang === 'id' ? 'Koneksi bermasalah. Silakan coba lagi.' : 'Network error. Please try again.');
    }
  }

  const fields = [
    {
      label: lang === 'id' ? 'Nama / Perusahaan' : 'Name or Company Name',
      value: name,
      setValue: setName,
      type: 'text',
      placeholder: lang === 'id' ? 'cth. PT. Maju Jaya Interior' : 'e.g. PT. Maju Jaya Interior',
    },
    {
      label: lang === 'id' ? 'Nomor Telepon' : 'Phone Number',
      value: phone,
      setValue: setPhone,
      type: 'tel',
      placeholder: 'e.g. 0812 3456 7890',
    },
  ];

  return (
    <div className="border border-edl-line bg-white">
      <div className="border-b border-edl-line bg-edl-50 px-6 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-edl-700">
          {lang === 'id' ? 'Data Anda' : 'Your Details'}
        </p>
      </div>
      <div className="space-y-5 p-6">
        {fields.map((field) => (
          <label className="block" key={field.label}>
            <span className="label mb-2 block text-edl-600">{field.label} <span className="text-edl-blue">*</span></span>
            <input
              type={field.type}
              value={field.value}
              onChange={(event) => field.setValue(event.target.value)}
              placeholder={field.placeholder}
              className="field w-full"
            />
          </label>
        ))}
        <label className="block">
          <span className="label mb-2 block text-edl-600">
            {lang === 'id' ? 'Alamat' : 'Address'} <span className="text-edl-blue">*</span>
          </span>
          <textarea
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder={lang === 'id' ? 'Jalan, kota, provinsi' : 'Street, city, province'}
            rows={3}
            className="field w-full resize-none py-3"
          />
        </label>
      </div>
      {status === 'error' ? (
        <div className="border-t border-red-200 bg-red-50 px-6 py-3">
          <p className="text-[12px] font-medium text-red-700">{error}</p>
        </div>
      ) : null}
      <div className="flex flex-col items-start justify-between gap-4 border-t border-edl-line bg-edl-50/50 px-6 py-5 sm:flex-row sm:items-center">
        <p className="text-[11px] text-edl-400">
          {canSubmit
            ? (lang === 'id' ? 'Data lengkap — lanjutkan untuk mengunduh.' : 'Details complete — continue to download.')
            : (lang === 'id' ? 'Mohon isi semua kolom.' : 'Please complete all fields.')}
        </p>
        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit}
          className="btn-ink min-w-[180px] shrink-0 justify-center disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === 'submitting'
            ? (lang === 'id' ? 'Mengirim…' : 'Submitting…')
            : (lang === 'id' ? 'Lanjutkan' : 'Continue')}
        </button>
      </div>
    </div>
  );
}
