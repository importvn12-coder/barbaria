import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  Clock,
  Crown,
  Edit3,
  Loader2,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  ShieldCheck,
  Star,
  Trash2,
  UserPlus,
  X
} from "lucide-react";
import { api } from "./api";
import { fallbackBarbers, fallbackServices, galleryImages, testimonials, whatsappNumber } from "./data";

const emptyService = { name: "", description: "", price: "", duration: "", image: "", featured: false };
const emptyBarber = { name: "", specialty: "", photo: "", availableTimes: "09:00, 10:00, 14:00, 16:00", bio: "" };

function money(value) {
  return Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function buildWhatsAppUrl(message = "Olá, gostaria de agendar um horário na Royal Barber.") {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function SectionTitle({ kicker, title, text }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-royal-gold">{kicker}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-white/[0.62]">{text}</p>}
    </div>
  );
}

function Toast({ toast, setToast }) {
  if (!toast) return null;
  return (
    <div className="fixed right-4 top-24 z-50 max-w-sm rounded-2xl border border-royal-gold/30 bg-royal-coal px-5 py-4 text-sm text-white shadow-royal">
      <button className="absolute right-3 top-3 text-white/[0.45] hover:text-white" onClick={() => setToast(null)} aria-label="Fechar aviso">
        <X size={16} />
      </button>
      <strong className="block pr-6 text-royal-gold">{toast.title}</strong>
      <span className="mt-1 block text-white/70">{toast.message}</span>
    </div>
  );
}

function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const nav = [
    ["home", "Home"],
    ["servicos", "Serviços"],
    ["barbeiros", "Barbeiros"],
    ["agendamento", "Agendamento"],
    ["admin", "Admin"]
  ];

  const go = (id) => {
    setPage(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-royal-black/84 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button onClick={() => go("home")} className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal-gold text-black shadow-royal">
            <Crown size={23} />
          </span>
          <span className="text-left">
            <strong className="block text-lg font-black leading-tight text-white">Royal Barber</strong>
            <small className="text-xs text-white/[0.52]">Premium grooming</small>
          </span>
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {nav.map(([id, label]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${page === id ? "bg-white text-black" : "text-white/[0.68] hover:bg-white/10 hover:text-white"}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-royal-gold hover:text-royal-gold" aria-label="WhatsApp">
            <MessageCircle size={20} />
          </a>
          <button onClick={() => go("agendamento")} className="rounded-xl bg-royal-gold px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-royal-goldSoft">
            Agendar Horário
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.08] text-white lg:hidden" aria-label="Abrir menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-royal-black px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {nav.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className={`rounded-xl px-4 py-3 text-left font-bold ${page === id ? "bg-royal-gold text-black" : "bg-white/5 text-white"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function ServiceCard({ service, onBook }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-royal transition hover:-translate-y-1 hover:border-royal-gold/50">
      <div className="h-56 overflow-hidden">
        <img src={service.image} alt={service.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black text-white">{service.name}</h3>
          <span className="rounded-full bg-royal-gold px-3 py-1 text-sm font-black text-black">{money(service.price)}</span>
        </div>
        <p className="mt-3 min-h-16 text-sm leading-6 text-white/[0.62]">{service.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-white/[0.72]"><Clock size={16} /> {service.duration} min</span>
          <button onClick={() => onBook(service._id)} className="rounded-xl border border-royal-gold/50 px-4 py-2 text-sm font-bold text-royal-gold transition hover:bg-royal-gold hover:text-black">
            Agendar
          </button>
        </div>
      </div>
    </article>
  );
}

function Home({ services, setPage, chooseService }) {
  const featured = services.filter((service) => service.featured).slice(0, 3);

  return (
    <>
      <section className="hero-bg min-h-[700px] px-4 pt-36 sm:px-6 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl soft-enter">
            <p className="inline-flex items-center gap-2 rounded-full border border-royal-gold/40 bg-royal-gold/10 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-royal-gold">
              <ShieldCheck size={17} /> Experiência premium
            </p>
            <h1 className="mt-7 text-5xl font-black leading-[0.96] tracking-tight text-white sm:text-7xl lg:text-8xl">Royal Barber</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.72]">
              Cortes precisos, barba impecável e agendamento online em uma barbearia feita para quem valoriza tempo, estilo e presença.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setPage("agendamento")} className="rounded-xl bg-royal-gold px-6 py-4 font-black text-black shadow-royal transition hover:-translate-y-1 hover:bg-royal-goldSoft">
                Agendar Horário
              </button>
              <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.08] px-6 py-4 font-black text-white transition hover:border-royal-gold hover:text-royal-gold">
                <MessageCircle size={20} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <SectionTitle kicker="Serviços" title="Ritual completo de barbearia" text="Escolha seu serviço, selecione um barbeiro e confirme seu horário em poucos cliques." />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {featured.map((service) => <ServiceCard key={service._id} service={service} onBook={chooseService} />)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-20 sm:px-6">
        <SectionTitle kicker="Avaliações" title="Clientes que voltam toda semana" />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-white/10 bg-royal-coal p-6">
              <div className="mb-4 flex gap-1 text-royal-gold">{Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
              <p className="leading-7 text-white/70">"{item.text}"</p>
              <strong className="mt-5 block text-white">{item.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <SectionTitle kicker="Galeria" title="Cortes com assinatura Royal" />
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image) => <img key={image} src={image} alt="Corte Royal Barber" className="h-72 w-full rounded-2xl object-cover" loading="lazy" />)}
        </div>
      </section>

      <Location />
    </>
  );
}

function ServicesPage({ services, chooseService }) {
  return (
    <main className="px-4 pb-20 pt-32 sm:px-6">
      <SectionTitle kicker="Menu Royal" title="Serviços e valores" text="Todos os serviços incluem consultoria rápida, acabamento e finalização." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => <ServiceCard key={service._id} service={service} onBook={chooseService} />)}
      </div>
    </main>
  );
}

function BarbersPage({ barbers }) {
  return (
    <main className="px-4 pb-20 pt-32 sm:px-6">
      <SectionTitle kicker="Time" title="Barbeiros especialistas" text="Escolha o profissional ideal para o seu estilo." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {barbers.map((barber) => (
          <article key={barber._id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-royal">
            <img src={barber.photo} alt={barber.name} className="h-80 w-full object-cover" loading="lazy" />
            <div className="p-6">
              <h3 className="text-2xl font-black text-white">{barber.name}</h3>
              <p className="mt-1 font-bold text-royal-gold">{barber.specialty}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {barber.availableTimes.map((time) => <span key={time} className="rounded-full bg-white/[0.08] px-3 py-1 text-sm text-white/[0.74]">{time}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function BookingPage({ services, barbers, selectedService, setSelectedService, setToast }) {
  const [form, setForm] = useState({
    service: selectedService || services[0]?._id || "",
    barber: barbers[0]?._id || "",
    date: "",
    time: "",
    customerName: "",
    customerPhone: ""
  });
  const [loading, setLoading] = useState(false);
  const currentBarber = barbers.find((barber) => barber._id === form.barber);
  const currentService = services.find((service) => service._id === form.service);

  useEffect(() => {
    setForm((old) => ({ ...old, service: selectedService || old.service || services[0]?._id || "", barber: old.barber || barbers[0]?._id || "" }));
  }, [selectedService, services, barbers]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const created = await api.createAppointment(form);
      const message = created.whatsappMessage || `Olá, meu nome é ${form.customerName}. Gostaria de confirmar meu horário para ${currentService?.name} às ${form.time}.`;
      setToast({ title: "Agendamento confirmado", message: "Seu horário foi salvo. Abrindo confirmação no WhatsApp." });
      setForm((old) => ({ ...old, date: "", time: "", customerName: "", customerPhone: "" }));
      setSelectedService("");
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    } catch (error) {
      setToast({ title: "Não foi possível agendar", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="px-4 pb-20 pt-32 sm:px-6">
      <SectionTitle kicker="Agendamento" title="Reserve seu horário" text="Selecione serviço, barbeiro, data e horário. A confirmação é gerada para WhatsApp automaticamente." />
      <form onSubmit={submit} className="mx-auto grid max-w-6xl gap-5 rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-royal lg:grid-cols-2 lg:p-8">
        <div className="space-y-4">
          <Select label="Serviço" value={form.service} onChange={(value) => setForm({ ...form, service: value })} options={services.map((service) => ({ value: service._id, label: `${service.name} - ${money(service.price)}` }))} />
          <Select label="Barbeiro" value={form.barber} onChange={(value) => setForm({ ...form, barber: value, time: "" })} options={barbers.map((barber) => ({ value: barber._id, label: `${barber.name} - ${barber.specialty}` }))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Data" type="date" value={form.date} min={new Date().toISOString().slice(0, 10)} onChange={(value) => setForm({ ...form, date: value })} />
            <Select label="Horário" value={form.time} onChange={(value) => setForm({ ...form, time: value })} options={(currentBarber?.availableTimes || []).map((time) => ({ value: time, label: time }))} />
          </div>
          <Input label="Nome" value={form.customerName} onChange={(value) => setForm({ ...form, customerName: value })} placeholder="Seu nome completo" />
          <Input label="Telefone" value={form.customerPhone} onChange={(value) => setForm({ ...form, customerPhone: value })} placeholder="(11) 99999-9999" />
        </div>

        <div className="rounded-2xl border border-royal-gold/20 bg-black/[0.28] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-royal-gold">Resumo</p>
          <h3 className="mt-4 text-3xl font-black text-white">{currentService?.name || "Escolha um serviço"}</h3>
          <p className="mt-3 text-white/[0.64]">{currentService?.description}</p>
          <div className="mt-6 grid gap-3 text-sm text-white/[0.72]">
            <span className="inline-flex items-center gap-2"><Scissors size={17} /> {currentBarber?.name || "Barbeiro"}</span>
            <span className="inline-flex items-center gap-2"><CalendarCheck size={17} /> {form.date || "Data não selecionada"} às {form.time || "--:--"}</span>
            <span className="inline-flex items-center gap-2"><Clock size={17} /> {currentService?.duration || 0} minutos</span>
          </div>
          <div className="gold-line my-7 h-px" />
          <div className="flex items-center justify-between">
            <span className="text-white/[0.58]">Total</span>
            <strong className="text-3xl text-royal-gold">{money(currentService?.price)}</strong>
          </div>
          <button disabled={loading} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-royal-gold px-5 py-4 font-black text-black transition hover:bg-royal-goldSoft disabled:cursor-not-allowed disabled:opacity-60">
            {loading && <Loader2 className="animate-spin" size={20} />} Confirmar agendamento
          </button>
        </div>
      </form>
    </main>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "", min }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/[0.72]">{label}</span>
      <input required type={type} min={min} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-white/10 bg-black/[0.35] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-royal-gold" />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/[0.72]">{label}</span>
      <select required value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-white/10 bg-black/[0.35] px-4 py-3 text-white outline-none transition focus:border-royal-gold">
        <option value="">Selecione</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function AdminPage({ services, barbers, refresh, setToast }) {
  const [token, setToken] = useState(localStorage.getItem("royal_admin_token") || "");
  const [login, setLogin] = useState({ email: "admin@royalbarber.com", password: "admin123" });
  const [appointments, setAppointments] = useState([]);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [barberForm, setBarberForm] = useState(emptyBarber);
  const [editingService, setEditingService] = useState("");
  const [editingBarber, setEditingBarber] = useState("");

  useEffect(() => {
    if (token) loadAppointments();
  }, [token]);

  async function doLogin(event) {
    event.preventDefault();
    try {
      const data = await api.login(login);
      localStorage.setItem("royal_admin_token", data.token);
      setToken(data.token);
      setToast({ title: "Bem-vindo", message: "Painel administrativo liberado." });
    } catch (error) {
      setToast({ title: "Login inválido", message: error.message });
    }
  }

  async function loadAppointments() {
    try {
      setAppointments(await api.appointments());
    } catch (error) {
      setToast({ title: "Erro no dashboard", message: error.message });
    }
  }

  async function saveService(event) {
    event.preventDefault();
    try {
      if (editingService) await api.updateService(editingService, serviceForm);
      else await api.createService(serviceForm);
      setServiceForm(emptyService);
      setEditingService("");
      await refresh();
      setToast({ title: "Serviço salvo", message: "Lista atualizada com sucesso." });
    } catch (error) {
      setToast({ title: "Erro ao salvar", message: error.message });
    }
  }

  async function saveBarber(event) {
    event.preventDefault();
    try {
      const payload = { ...barberForm, availableTimes: barberForm.availableTimes.split(",").map((time) => time.trim()).filter(Boolean) };
      if (editingBarber) await api.updateBarber(editingBarber, payload);
      else await api.createBarber(payload);
      setBarberForm(emptyBarber);
      setEditingBarber("");
      await refresh();
      setToast({ title: "Barbeiro salvo", message: "Horários atualizados." });
    } catch (error) {
      setToast({ title: "Erro ao salvar", message: error.message });
    }
  }

  async function removeAppointment(id) {
    await api.deleteAppointment(id);
    await loadAppointments();
    setToast({ title: "Agendamento cancelado", message: "O horário foi removido do painel." });
  }

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center px-4 pt-24">
        <form onSubmit={doLogin} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.045] p-8 shadow-royal">
          <Crown className="mb-5 text-royal-gold" size={42} />
          <h1 className="text-3xl font-black text-white">Login Admin</h1>
          <p className="mt-2 text-white/[0.58]">Acesse o painel da Royal Barber.</p>
          <div className="mt-7 space-y-4">
            <Input label="E-mail" type="email" value={login.email} onChange={(value) => setLogin({ ...login, email: value })} />
            <Input label="Senha" type="password" value={login.password} onChange={(value) => setLogin({ ...login, password: value })} />
          </div>
          <button className="mt-6 w-full rounded-xl bg-royal-gold px-5 py-4 font-black text-black">Entrar</button>
        </form>
      </main>
    );
  }

  return (
    <main className="px-4 pb-20 pt-32 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-royal-gold">Painel Admin</p>
            <h1 className="mt-2 text-4xl font-black text-white">Dashboard Royal Barber</h1>
          </div>
          <button onClick={() => { localStorage.removeItem("royal_admin_token"); setToken(""); }} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 font-bold text-white/[0.72] hover:border-royal-gold hover:text-royal-gold">
            <LogOut size={18} /> Sair
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Metric label="Agendamentos" value={appointments.length} />
          <Metric label="Serviços" value={services.length} />
          <Metric label="Clientes" value={new Set(appointments.map((item) => item.customerPhone)).size} />
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <h2 className="mb-5 text-2xl font-black text-white">Agendamentos</h2>
          <div className="grid gap-3">
            {appointments.length === 0 && <p className="text-white/55">Nenhum agendamento encontrado.</p>}
            {appointments.map((item) => (
              <div key={item._id} className="grid gap-3 rounded-xl bg-black/[0.28] p-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <strong className="text-white">{item.customerName}</strong>
                  <p className="text-sm text-white/60">{item.service?.name} com {item.barber?.name} - {item.date} às {item.time} - {item.customerPhone}</p>
                </div>
                <button onClick={() => removeAppointment(item._id)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/30 px-4 py-2 text-sm font-bold text-red-200 hover:bg-red-500/10">
                  <Trash2 size={16} /> Cancelar
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <AdminForm title="Editar serviços" icon={<Edit3 />} onSubmit={saveService}>
            <Input label="Nome" value={serviceForm.name} onChange={(value) => setServiceForm({ ...serviceForm, name: value })} />
            <Input label="Descrição" value={serviceForm.description} onChange={(value) => setServiceForm({ ...serviceForm, description: value })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Preço" type="number" value={serviceForm.price} onChange={(value) => setServiceForm({ ...serviceForm, price: value })} />
              <Input label="Tempo em minutos" type="number" value={serviceForm.duration} onChange={(value) => setServiceForm({ ...serviceForm, duration: value })} />
            </div>
            <Input label="Imagem URL" value={serviceForm.image} onChange={(value) => setServiceForm({ ...serviceForm, image: value })} />
            <button className="rounded-xl bg-royal-gold px-5 py-3 font-black text-black">Salvar serviço</button>
          </AdminForm>

          <AdminForm title="Adicionar barbeiros e horários" icon={<UserPlus />} onSubmit={saveBarber}>
            <Input label="Nome" value={barberForm.name} onChange={(value) => setBarberForm({ ...barberForm, name: value })} />
            <Input label="Especialidade" value={barberForm.specialty} onChange={(value) => setBarberForm({ ...barberForm, specialty: value })} />
            <Input label="Foto URL" value={barberForm.photo} onChange={(value) => setBarberForm({ ...barberForm, photo: value })} />
            <Input label="Horários disponíveis" value={barberForm.availableTimes} onChange={(value) => setBarberForm({ ...barberForm, availableTimes: value })} />
            <button className="rounded-xl bg-royal-gold px-5 py-3 font-black text-black">Salvar barbeiro</button>
          </AdminForm>
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <AdminList title="Serviços cadastrados">
            {services.map((service) => (
              <div key={service._id} className="rounded-xl bg-black/[0.24] p-4">
                <strong>{service.name}</strong>
                <p className="text-sm text-white/55">{money(service.price)} - {service.duration} min</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => { setEditingService(service._id); setServiceForm(service); }} className="rounded-lg bg-white/[0.08] px-3 py-2 text-sm">Editar</button>
                  <button onClick={async () => { await api.deleteService(service._id); await refresh(); }} className="rounded-lg bg-red-500/[0.14] px-3 py-2 text-sm text-red-200">Excluir</button>
                </div>
              </div>
            ))}
          </AdminList>
          <AdminList title="Barbeiros e horários">
            {barbers.map((barber) => (
              <div key={barber._id} className="rounded-xl bg-black/[0.24] p-4">
                <strong>{barber.name}</strong>
                <p className="text-sm text-white/55">{barber.specialty}</p>
                <p className="mt-1 text-sm text-white/55">{barber.availableTimes.join(", ")}</p>
                <button
                  onClick={() => {
                    setEditingBarber(barber._id);
                    setBarberForm({ ...barber, availableTimes: barber.availableTimes.join(", ") });
                  }}
                  className="mt-3 rounded-lg bg-white/[0.08] px-3 py-2 text-sm"
                >
                  Editar horários
                </button>
              </div>
            ))}
          </AdminList>
          <AdminList title="Clientes">
            {[...new Map(appointments.map((item) => [item.customerPhone, item])).values()].map((client) => (
              <div key={client.customerPhone} className="rounded-xl bg-black/[0.24] p-4">
                <strong>{client.customerName}</strong>
                <p className="text-sm text-white/55">{client.customerPhone}</p>
              </div>
            ))}
          </AdminList>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
      <p className="text-sm font-bold text-white/55">{label}</p>
      <strong className="mt-2 block text-4xl text-royal-gold">{value}</strong>
    </div>
  );
}

function AdminForm({ title, icon, children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5">
      <h2 className="flex items-center gap-2 text-2xl font-black text-white">{icon} {title}</h2>
      {children}
    </form>
  );
}

function AdminList({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
      <h2 className="mb-4 text-2xl font-black text-white">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

function Location() {
  return (
    <section className="border-t border-white/10 px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-royal-gold">Localização</p>
          <h2 className="mt-3 text-4xl font-black text-white">Rua da Coroa, 777</h2>
          <p className="mt-4 leading-7 text-white/[0.62]">Centro, São Paulo - SP. Segunda a sábado, das 8h às 20h.</p>
          <p className="mt-4 inline-flex items-center gap-2 text-white/[0.72]"><Phone size={18} /> (11) 99999-9999</p>
          <p className="mt-2 inline-flex items-center gap-2 text-white/[0.72]"><MapPin size={18} /> Estacionamento próximo e fácil acesso.</p>
        </div>
        <div className="min-h-80 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#181818,#0b0b0b)] p-6">
          <div className="grid h-full place-items-center rounded-xl border border-royal-gold/20 bg-black/[0.24] text-center">
            <div>
              <MapPin className="mx-auto text-royal-gold" size={46} />
              <p className="mt-4 text-xl font-black text-white">Royal Barber</p>
              <p className="text-white/55">Mapa ilustrativo para deploy sem dependências externas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkeletonGrid() {
  return (
    <div className="mx-auto grid max-w-7xl gap-5 px-4 py-32 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => <div key={index} className="skeleton h-96 rounded-2xl" />)}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-white/48">
      <strong className="text-white">Royal Barber</strong> - Barbearia premium com agendamento online.
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [services, setServices] = useState(fallbackServices);
  const [barbers, setBarbers] = useState(fallbackBarbers);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [selectedService, setSelectedService] = useState("");

  async function refresh() {
    const [serviceData, barberData] = await Promise.all([api.services(), api.barbers()]);
    setServices(serviceData);
    setBarbers(barberData);
  }

  useEffect(() => {
    refresh()
      .catch(() => setToast({ title: "Modo demonstração", message: "Conecte o backend para salvar agendamentos e gerenciar dados." }))
      .finally(() => setLoading(false));
  }, []);

  function chooseService(id) {
    setSelectedService(id);
    setPage("agendamento");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const pageView = useMemo(() => {
    if (loading) return <SkeletonGrid />;
    if (page === "servicos") return <ServicesPage services={services} chooseService={chooseService} />;
    if (page === "barbeiros") return <BarbersPage barbers={barbers} />;
    if (page === "agendamento") return <BookingPage services={services} barbers={barbers} selectedService={selectedService} setSelectedService={setSelectedService} setToast={setToast} />;
    if (page === "admin") return <AdminPage services={services} barbers={barbers} refresh={refresh} setToast={setToast} />;
    return <Home services={services} setPage={setPage} chooseService={chooseService} />;
  }, [page, services, barbers, loading, selectedService]);

  return (
    <div className="min-h-screen bg-royal-black text-royal-cream">
      <Navbar page={page} setPage={setPage} />
      {pageView}
      <Footer />
      <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-royal transition hover:scale-105" aria-label="WhatsApp">
        <MessageCircle size={26} />
      </a>
      <Toast toast={toast} setToast={setToast} />
    </div>
  );
}
