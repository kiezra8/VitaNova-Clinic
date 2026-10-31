import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  Navigation as NavIcon,
  Phone,
  Clock,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Building2
} from 'lucide-react';
import {
  NearbyClinic,
  fetchNearbyClinics,
  upsertNearbyClinic,
  deleteNearbyClinic,
  DEFAULT_NEARBY_CLINICS
} from '../../lib/supabase';

interface NearbyClinicsViewProps {
  isAdmin?: boolean;
  onOpenAdminChat?: (clinicName: string) => void;
}

// Haversine formula to compute distance in km
function computeDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const NearbyClinicsView: React.FC<NearbyClinicsViewProps> = ({
  isAdmin = false,
  onOpenAdminChat
}) => {
  const [clinics, setClinics] = useState<NearbyClinic[]>(DEFAULT_NEARBY_CLINICS);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Admin Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClinic, setEditingClinic] = useState<NearbyClinic | null>(null);
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [clinicCity, setClinicCity] = useState('Kampala');
  const [clinicLat, setClinicLat] = useState('0.3204');
  const [clinicLng, setClinicLng] = useState('32.5788');
  const [clinicPhone, setClinicPhone] = useState('+256 ');
  const [clinicHours, setClinicHours] = useState('24 Hours');
  const [clinicImageUrl, setClinicImageUrl] = useState('');
  const [clinicImageFile, setClinicImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Load clinics from Supabase / cache
  useEffect(() => {
    let alive = true;
    fetchNearbyClinics().then((data) => {
      if (alive && data.length > 0) {
        setClinics(data);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  // Request GPS position
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsLocating(false);
      },
      (err) => {
        setGeoError(err.message || 'Unable to access your GPS location.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Try fetching GPS on component mount
  useEffect(() => {
    requestLocation();
  }, []);

  // Sort and filter clinics by proximity
  const sortedClinics = useMemo(() => {
    const list = clinics.map((c) => {
      if (userCoords) {
        return {
          ...c,
          distanceKm: computeDistanceKm(userCoords.lat, userCoords.lng, c.latitude, c.longitude)
        };
      }
      return c;
    });

    if (userCoords) {
      list.sort((a, b) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999));
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        (c.city && c.city.toLowerCase().includes(q))
    );
  }, [clinics, userCoords, searchQuery]);

  // Open add/edit modal
  const handleOpenAdd = (clinicToEdit?: NearbyClinic) => {
    if (clinicToEdit) {
      setEditingClinic(clinicToEdit);
      setClinicName(clinicToEdit.name);
      setClinicAddress(clinicToEdit.address);
      setClinicCity(clinicToEdit.city || 'Kampala');
      setClinicLat(String(clinicToEdit.latitude));
      setClinicLng(String(clinicToEdit.longitude));
      setClinicPhone(clinicToEdit.phone || '');
      setClinicHours(clinicToEdit.operatingHours || '24 Hours');
      setClinicImageUrl(clinicToEdit.imageUrl);
      setClinicImageFile(null);
    } else {
      setEditingClinic(null);
      setClinicName('');
      setClinicAddress('');
      setClinicCity('Kampala');
      setClinicLat(userCoords ? String(userCoords.lat) : '0.3204');
      setClinicLng(userCoords ? String(userCoords.lng) : '32.5788');
      setClinicPhone('+256 ');
      setClinicHours('24 Hours');
      setClinicImageUrl('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80');
      setClinicImageFile(null);
    }
    setShowAddModal(true);
  };

  const handleSaveClinic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinicName.trim() || !clinicAddress.trim()) return;

    setIsSaving(true);
    const newClinic: NearbyClinic = {
      id: editingClinic ? editingClinic.id : `clinic_${Date.now()}`,
      name: clinicName.trim(),
      address: clinicAddress.trim(),
      city: clinicCity.trim(),
      latitude: parseFloat(clinicLat) || 0.3204,
      longitude: parseFloat(clinicLng) || 32.5788,
      imageUrl: clinicImageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
      phone: clinicPhone.trim(),
      operatingHours: clinicHours.trim()
    };

    const saved = await upsertNearbyClinic(newClinic, clinicImageFile);
    setClinics((prev) => {
      const idx = prev.findIndex((c) => c.id === saved.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });

    setIsSaving(false);
    setShowAddModal(false);
    setSaveNotice(`Clinic "${saved.name}" saved successfully.`);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleDeleteClinic = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name}?`)) return;
    await deleteNearbyClinic(id);
    setClinics((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6 pb-28 text-slate-900 bg-white min-h-screen">
      {/* ── HEADER ── */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-700 flex items-center justify-center border border-teal-500/30 shrink-0">
              <Building2 className="w-6 h-6 text-teal-700" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Nearby Clinics & Medical Centers
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  {clinics.length} Centers
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Verified clinics near your location with direct admin contact
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* GPS Status Button */}
            <button
              onClick={requestLocation}
              disabled={isLocating}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors border ${
                userCoords
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <NavIcon className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>
                {isLocating
                  ? 'Locating...'
                  : userCoords
                  ? 'GPS Active'
                  : 'Enable GPS'}
              </span>
            </button>

            {/* Admin Add Clinic Button */}
            {isAdmin && (
              <button
                onClick={() => handleOpenAdd()}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Clinic</span>
              </button>
            )}
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-4 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clinic name or area..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {geoError && (
          <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{geoError} Clinics are listed by default order.</span>
          </div>
        )}

        {saveNotice && (
          <div className="mt-3 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{saveNotice}</span>
          </div>
        )}
      </div>

      {/* ── CLINICS GRID ── */}
      {sortedClinics.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-2">
          <Building2 className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No clinics found</h3>
          <p className="text-xs text-slate-500">Try a different search or clear your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedClinics.map((clinic) => {
            const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${clinic.latitude},${clinic.longitude}`;

            return (
              <div
                key={clinic.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-500/40 transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Photo & Distance Badge */}
                <div className="relative w-full aspect-[16/9] bg-slate-100 overflow-hidden">
                  <img
                    src={clinic.imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80'}
                    alt={clinic.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    {clinic.distanceKm !== undefined ? (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-sm text-teal-300 border border-teal-500/30 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-teal-400" />
                        <span>{clinic.distanceKm} km away</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-sm text-slate-300 border border-slate-700">
                        {clinic.city || 'Uganda'}
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5">
                      <button
                        onClick={() => handleOpenAdd(clinic)}
                        className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/85 backdrop-blur-sm"
                        title="Edit Clinic"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClinic(clinic.id, clinic.name)}
                        className="p-1.5 rounded-lg bg-rose-600/80 text-white hover:bg-rose-700 backdrop-blur-sm"
                        title="Delete Clinic"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {clinic.name}
                    </h3>
                    <p className="text-xs text-slate-600 flex items-start space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{clinic.address}</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                      {clinic.operatingHours && (
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-teal-600" />
                          <span>{clinic.operatingHours}</span>
                        </span>
                      )}
                      {clinic.phone && (
                        <a
                          href={`tel:${clinic.phone}`}
                          className="flex items-center space-x-1 text-slate-700 hover:text-teal-600 font-medium"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{clinic.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    {/* Text Clinic (Routes to Admin) */}
                    <button
                      onClick={() => {
                        if (onOpenAdminChat) {
                          onOpenAdminChat(clinic.name);
                        }
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Text Clinic</span>
                    </button>

                    {/* Directions via Google Maps */}
                    <a
                      href={mapDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center space-x-1 transition-colors border border-slate-200"
                      title="Get directions on Google Maps"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── ADMIN ADD / EDIT MODAL ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 border border-slate-200 shadow-2xl space-y-4 my-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingClinic ? 'Edit Clinic' : 'Add Nearby Clinic'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveClinic} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Clinic / Medical Center Name *
                </label>
                <input
                  type="text"
                  required
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="e.g. VitaNova Central Clinic"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Physical Address / Street *
                </label>
                <input
                  type="text"
                  required
                  value={clinicAddress}
                  onChange={(e) => setClinicAddress(e.target.value)}
                  placeholder="e.g. Plot 14 Lumumba Avenue, Nakasero"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">City / Town</label>
                  <input
                    type="text"
                    value={clinicCity}
                    onChange={(e) => setClinicCity(e.target.value)}
                    placeholder="Kampala"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={clinicHours}
                    onChange={(e) => setClinicHours(e.target.value)}
                    placeholder="24 Hours or 8am-8pm"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
              </div>

              {/* Coordinates with current GPS button */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Latitude</label>
                  <input
                    type="text"
                    value={clinicLat}
                    onChange={(e) => setClinicLat(e.target.value)}
                    placeholder="0.3204"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Longitude</label>
                  <input
                    type="text"
                    value={clinicLng}
                    onChange={(e) => setClinicLng(e.target.value)}
                    placeholder="32.5788"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium font-mono"
                  />
                </div>
              </div>

              {userCoords && (
                <button
                  type="button"
                  onClick={() => {
                    setClinicLat(String(userCoords.lat));
                    setClinicLng(String(userCoords.lng));
                  }}
                  className="text-[11px] font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1"
                >
                  <NavIcon className="w-3 h-3" />
                  <span>Use My Current GPS Position ({userCoords.lat.toFixed(4)}, {userCoords.lng.toFixed(4)})</span>
                </button>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={clinicPhone}
                  onChange={(e) => setClinicPhone(e.target.value)}
                  placeholder="+256 700 000 000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Clinic Photo URL</label>
                <input
                  type="url"
                  value={clinicImageUrl}
                  onChange={(e) => setClinicImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Or Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setClinicImageFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Clinic'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
