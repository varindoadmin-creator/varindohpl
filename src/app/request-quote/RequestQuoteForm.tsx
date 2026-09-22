'use client';

import { useState } from 'react';
import { ProductCodeInput, type ProductOption } from '@/components/ProductCodeInput';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/i18n';

const MAX  = 10;
const ROWS = 3;   // rows shown on an empty form

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Row    = { code: string; qty: string };

const emptyRows = () => Array.from({ length: ROWS }, () => ({ code: '', qty: '' }));

export function RequestQuoteForm({ products }: { products: ProductOption[] }) {
  const { lang } = useLang();

  const [rows,    setRows]    = useState<Row[]>(emptyRows);
  const [notes,   setNotes]   = useState('');
  const [name,    setName]    = useState('');
  const [address, setAddress] = useState('');
  const [phone,   setPhone]   = useState('');
  const [status,  setStatus]  = useState<Status>('idle');
  const [errMsg,  setErrMsg]  = useState('');

  const update = (i: number, patch: Partial<Row>) =>
    setRows((p) => p.map((r, idx) => idx === i ? { ...r, ...patch } : r));

  const addRow    = () => setRows((p) => p.length < MAX ? [...p, { code: '', qty: '' }] : p);
  const removeRow = (i: number) =>
    setRows((p) => p.length > 1 ? p.filter((_, idx) => idx !== i) : [{ code: '', qty: '' }]);

  // A row counts only once it has both a product and a quantity. Quantities are
  // whole sheets, so anything fractional or below 1 is not a usable line.
  const parseQty = (qty: string) => {
    const n = Number(qty.trim());
    return Number.isInteger(n) && n > 0 ? n : null;
  };

  const picked      = rows.filter((r) => r.code.trim());
  const items       = picked
    .map((r) => ({ code: r.code.trim(), qty: parseQty(r.qty) }))
    .filter((r): r is { code: string; qty: number } => r.qty !== null);
  const badQty      = picked.length > items.length;
  const duplicate   = new Set(picked.map((r) => r.code.trim())).size < picked.length;
  const totalSheets = items.reduce((sum, r) => sum + r.qty, 0);

  const canSubmit = Boolean(
    name.trim() && address.trim() && phone.trim() &&
    items.length > 0 && !badQty && !duplicate && status !== 'submitting'
  );

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus('submitting');
    setErrMsg('');
    try {
      const res  = await fetch('/api/submit-request', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          type: 'quote', name: name.trim(), address: address.trim(), phone: phone.trim(),
          items, notes: notes.trim() || undefined,
        }),
      });
      const data = await res.json();
      data.success ? setStatus('success') : (setStatus('error'), setErrMsg(data.error || t('forms', 'serverError', lang)));
    } catch {
      setStatus('error');
      setErrMsg(t('forms', 'networkError', lang));
    }
  };

  const reset = () => {
    setRows(emptyRows()); setNotes(''); setName(''); setAddress(''); setPhone('');
    setStatus('idle'); setErrMsg('');
  };

  /* ── Success ─────────────────────────────────────────────── */
  if (status === 'success') {
    return (
      <div className="border border-edl-line bg-white">
        <div className="px-8 py-14 flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 border-2 border-edl-blue flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M4 12.5L9 17.5L20 7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="label text-edl-blue mb-3">{t('forms', 'successLabel', lang)}</p>
            <h2 className="display text-edl-ink text-3xl sm:text-4xl mb-4">
              {t('forms', 'quoteSuccessTitle', lang)}
            </h2>
            <p className="text-[14px] leading-7 text-edl-500 max-w-sm mx-auto">
              {t('forms', 'quoteSuccessBody', lang, { n: items.length, phone })}
            </p>
          </div>
          <div className="w-full max-w-sm border border-edl-line bg-edl-50 text-left">
            <div className="border-b border-edl-line px-5 py-3 bg-white flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-edl-700">
                {t('forms', 'quoteItemsRequested', lang)}
              </p>
              <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-edl-blue shrink-0">
                {t('forms', 'quoteTotalSheets', lang, { n: totalSheets })}
              </span>
            </div>
            <div className="divide-y divide-edl-line/60">
              {items.map((item, i) => (
                <div key={i} className="flex items-baseline gap-3 px-5 py-3">
                  <span className="text-[10px] tracking-[0.14em] uppercase text-edl-400 w-4 shrink-0">{i + 1}</span>
                  <span className="text-[13px] font-medium text-edl-ink flex-1">{item.code}</span>
                  <span className="text-[12px] text-edl-500 shrink-0">
                    {item.qty} {t('forms', 'quoteQtyUnit', lang)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button type="button" onClick={reset} className="btn-ghost mt-2">
            {t('forms', 'submitAnother', lang)}
          </button>
        </div>
      </div>
    );
  }

  /* ── Form ────────────────────────────────────────────────── */
  return (
    <div className="border border-edl-line bg-white">
      <div className="border-b border-edl-line px-6 py-4 bg-edl-50 flex items-center justify-between gap-4">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-edl-700">
          {t('forms', 'quoteFormTitle', lang)}
        </p>
        {items.length > 0 && (
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-edl-blue shrink-0">
            {t('forms', 'quoteTotalSheets', lang, { n: totalSheets })}
          </span>
        )}
      </div>

      <div className="p-6 space-y-5">
        {/* Item rows */}
        <div>
          <span className="label text-edl-600 mb-3 block">
            {t('forms', 'quoteItemsLabel', lang)} <span className="text-edl-blue">*</span>
          </span>

          <div className="border border-edl-line divide-y divide-edl-line/50">
            <div className="flex items-center bg-edl-50/60">
              <span className="w-10 shrink-0 border-r border-edl-line/50 py-2" />
              <span className="flex-1 px-3 py-2 text-[10px] font-semibold tracking-[0.14em] uppercase text-edl-400">
                {t('forms', 'quoteProductCol', lang)}
              </span>
              <span className="w-24 shrink-0 border-l border-edl-line/50 px-3 py-2 text-[10px] font-semibold tracking-[0.14em] uppercase text-edl-400">
                {t('forms', 'quoteQtyLabel', lang)}
              </span>
              <span className="w-10 shrink-0" />
            </div>

            {rows.map((row, i) => (
              <div key={i} className="flex items-center">
                <span className="w-10 text-center text-[11px] font-medium text-edl-400 shrink-0 border-r border-edl-line/50 py-3">
                  {i + 1}
                </span>
                <div className="flex-1 relative">
                  <ProductCodeInput
                    products={products} value={row.code} onChange={(code) => update(i, { code })}
                    placeholder={i === 0 ? t('forms', 'quoteItemPlaceholder', lang) : ''}
                  />
                </div>
                <div className="w-24 shrink-0 border-l border-edl-line/50">
                  <input
                    type="number" min={1} step={1} inputMode="numeric"
                    value={row.qty}
                    onChange={(e) => update(i, { qty: e.target.value })}
                    aria-label={`${t('forms', 'quoteQtyLabel', lang)} ${i + 1}`}
                    className="w-full h-10 px-3 text-[12px] text-edl-ink bg-transparent outline-none focus:bg-edl-50/60"
                  />
                </div>
                <button
                  type="button" onClick={() => removeRow(i)}
                  aria-label={t('forms', 'quoteRemoveRow', lang)}
                  className="w-10 h-10 shrink-0 flex items-center justify-center text-edl-400 hover:text-edl-ink transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between gap-4">
            <p className="text-[11px] text-edl-400">
              {t('forms', 'quoteMaxLabel', lang, { n: MAX })}
            </p>
            {rows.length < MAX && (
              <button type="button" onClick={addRow}
                className="text-[11px] font-semibold text-edl-blue hover:underline shrink-0">
                {t('forms', 'quoteAddRow', lang)}
              </button>
            )}
          </div>

          {badQty && (
            <p className="mt-2 text-[11px] font-medium text-red-700">{t('forms', 'quoteQtyInvalid', lang)}</p>
          )}
          {duplicate && (
            <p className="mt-1 text-[11px] font-medium text-red-700">{t('forms', 'quoteDuplicate', lang)}</p>
          )}
        </div>

        <div className="border-t border-edl-line" />

        <label className="block">
          <span className="label text-edl-600 mb-2 block">
            {t('forms', 'nameLabel', lang)} <span className="text-edl-blue">*</span>
          </span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder={t('forms', 'namePlaceholder', lang)} className="field w-full" autoComplete="organization" />
        </label>

        <label className="block">
          <span className="label text-edl-600 mb-2 block">
            {t('forms', 'addressLabel', lang)} <span className="text-edl-blue">*</span>
          </span>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)}
            placeholder={t('forms', 'addressPlaceholder', lang)} rows={3} className="field w-full resize-none py-3" />
        </label>

        <label className="block">
          <span className="label text-edl-600 mb-2 block">
            {t('forms', 'phoneLabel', lang)} <span className="text-edl-blue">*</span>
          </span>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            placeholder={t('forms', 'phonePlaceholder', lang)} className="field w-full" autoComplete="tel" />
        </label>

        <label className="block">
          <span className="label text-edl-600 mb-2 block">{t('forms', 'quoteNotesLabel', lang)}</span>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder={t('forms', 'quoteNotesPlaceholder', lang)} rows={3} className="field w-full resize-none py-3" />
        </label>
      </div>

      {status === 'error' && (
        <div className="border-t border-red-200 bg-red-50 px-6 py-3">
          <p className="text-[12px] font-medium text-red-700">{errMsg}</p>
        </div>
      )}

      <div className="px-6 py-5 border-t border-edl-line bg-edl-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[11px] text-edl-400">
          {canSubmit
            ? t('forms', 'readyQuote', lang, { n: items.length })
            : t('forms', 'fillQuote', lang)}
        </p>
        <button
          type="button" onClick={handleSubmit} disabled={!canSubmit}
          className="btn-ink disabled:opacity-40 disabled:cursor-not-allowed shrink-0 min-w-[160px] justify-center"
        >
          {status === 'submitting' ? (
            <>
              <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t('forms', 'submitting', lang)}
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M17.5 2.5L9.167 10.833M17.5 2.5L12.5 17.5l-3.333-6.667L2.5 7.5l15-5z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('forms', 'submitBtn', lang)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
