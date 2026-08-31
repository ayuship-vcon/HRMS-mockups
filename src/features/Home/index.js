import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AccessTimeOutlined, AccountBalanceWalletOutlined, AccountTreeOutlined,
  AddCircleOutlineOutlined, ArticleOutlined, CakeOutlined, CalendarMonthOutlined,
  CardGiftcardOutlined, ChatBubbleOutlineRounded, GridViewOutlined,
  ReceiptLongOutlined, WorkspacePremiumOutlined,
} from "@mui/icons-material";
import { Box, Button, Card, CardContent, Divider, IconButton, LinearProgress, Stack, Typography } from "@mui/material";

const navy = "#0b4668";
const panelSx = { height: "100%", border: "1px solid #dbe3e8", borderRadius: 2, boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)" };

function Panel({ title, action, children }) {
  return <Card sx={panelSx}><CardContent sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: { xs: 2, sm: 2.5 } } }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}><Typography variant="subtitle2" fontWeight={800} sx={{ color: navy }}>{title}</Typography>{action}</Stack>
    <Divider sx={{ mb: 1.5, borderColor: "#edf1f3" }} />{children}
  </CardContent></Card>;
}

function DashboardList({ items, buttonLabel }) {
  return <Stack divider={<Divider flexItem sx={{ borderColor: "#edf1f3" }} />}>{items.map((item) => <Stack key={item.title} direction="row" alignItems="center" spacing={1.5} sx={{ py: 1.25 }}>
    {item.icon && <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: "#f1f4f5", display: "grid", placeItems: "center", color: navy, flexShrink: 0 }}>{item.icon}</Box>}
    <Box sx={{ minWidth: 0, flex: 1 }}><Typography variant="caption" fontWeight={700} noWrap display="block" color="#34383d">{item.title}</Typography><Typography variant="caption" color="text.secondary">{item.date}</Typography></Box>
    {buttonLabel && <Button size="small" variant="contained" sx={{ bgcolor: "#457b8d", textTransform: "none", minWidth: 0, px: 1.5, boxShadow: "none", "&:hover": { bgcolor: "#366270", boxShadow: "none" } }}>{buttonLabel}</Button>}
  </Stack>)}</Stack>;
}

function CircularGauge({ value }) {
  const radius = 29; const circumference = 2 * Math.PI * radius;
  return <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r={radius} fill="none" stroke="#edf1f3" strokeWidth="5" /><circle cx="36" cy="36" r={radius} fill="none" stroke={navy} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${(value / 100) * circumference} ${circumference}`} transform="rotate(180 36 36)" /></svg>;
}

function Gauge({ used, total, label }) {
  const percentage = Math.round((used / total) * 100);
  return <Stack alignItems="center" spacing={0.75} sx={{ flex: 1 }}><Box sx={{ position: "relative", width: 72, height: 72 }}><CircularGauge value={percentage} /><Typography sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: navy, fontWeight: 800, fontSize: 14 }}>{used}/{total}</Typography></Box><Typography variant="caption" fontWeight={600} color="text.secondary">{label}</Typography></Stack>;
}

function Home() {
  const navigate = useNavigate();
  const services = [["Leave Tracker", CalendarMonthOutlined, "/apply-leave"], ["Time Tracker", AccessTimeOutlined, "/chart"], ["Reimbursements", ReceiptLongOutlined], ["HR Letters", ArticleOutlined], ["Organization", AccountTreeOutlined, "/horizontal"], ["Create Request", AddCircleOutlineOutlined, "/apply-leave"], ["Payroll", AccountBalanceWalletOutlined, "/reports"], ["Benefits", CardGiftcardOutlined, "/reports"]];
  const linkButton = (label, path) => <Button size="small" onClick={() => path && navigate(path)} sx={{ textTransform: "none", color: "text.secondary" }}>{label}</Button>;

  return <Box sx={{ maxWidth: 1280, mx: "auto", p: { xs: 1, sm: 2, md: 3 }, pb: 6, position: "relative" }}><Stack spacing={2}>
    <Card sx={{ ...panelSx, minHeight: 116, position: "relative", overflow: "hidden" }}><CardContent sx={{ p: { xs: 2, sm: 2.5 }, position: "relative", zIndex: 1 }}><Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} spacing={{ xs: 2, sm: 6 }}><Typography sx={{ color: navy, fontFamily: "Georgia, serif", fontSize: { xs: 26, sm: 32 }, lineHeight: 1.2 }}>Good Morning, Subodh!</Typography><Stack direction="row" alignItems="center" spacing={1.5}><Box sx={{ minWidth: 150 }}><Typography variant="caption" fontWeight={700} color={navy}>Profile Completion</Typography><LinearProgress variant="determinate" value={85} sx={{ mt: 1, height: 7, borderRadius: 4, bgcolor: "#edf1f3", "& .MuiLinearProgress-bar": { bgcolor: navy } }} /></Box><Typography fontWeight={800} color={navy}>85%</Typography></Stack></Stack></CardContent><Box sx={{ position: "absolute", right: -20, top: -45, width: 190, height: 190, borderRadius: "50%", bgcolor: "#edf5f7" }} /></Card>

    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" }, gap: 2 }}><Panel title="Organizational News" action={linkButton("View all")}><Box sx={{ minHeight: 125, borderRadius: 1.5, p: 2, color: "white", display: "flex", alignItems: "flex-end", background: "linear-gradient(120deg, #0b4668 0%, #457b8d 58%, #9bc5c8 100%)" }}><Box><Typography variant="overline" sx={{ color: "#d9f4f2" }}>Learning & Development</Typography><Typography variant="h6" fontWeight={800}>AI Workshop — Register Now</Typography></Box></Box></Panel><Panel title="Birthdays and Work Anniversaries" action={linkButton("View all")}><DashboardList buttonLabel="Wish" items={[{ title: "Mahesh Jagdale's 7th work anniversary", date: "Nov 12, Sunday", icon: <WorkspacePremiumOutlined fontSize="small" /> }, { title: "Sagar Ingle has birthday today", date: "Nov 12, Sunday", icon: <CakeOutlined fontSize="small" /> }]} /></Panel></Box>

    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={0.5} sx={{ px: 0.5 }}><GridViewOutlined sx={{ fontSize: 17, color: "#1e293b" }} /><Button size="small" sx={{ textTransform: "none", color: "#1e293b", fontWeight: 700 }}>Edit layout</Button></Stack>

    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" }, gap: 2 }}><Panel title="Explore Services" action={linkButton("View all", "/users")}><Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: { xs: 2, sm: 3 }, pt: 1 }}>{services.map(([title, Icon, path]) => <Stack key={title} alignItems="center" spacing={0.75} onClick={() => path && navigate(path)} sx={{ cursor: path ? "pointer" : "default", color: navy, textAlign: "center", "&:hover .service-icon": { bgcolor: "#dce8ec", transform: "scale(1.05)" } }}><Box className="service-icon" sx={{ width: 48, height: 48, display: "grid", placeItems: "center", borderRadius: 1.5, bgcolor: "#f1f4f5", transition: "all .2s" }}><Icon /></Box><Typography variant="caption" fontWeight={700} lineHeight={1.15}>{title}</Typography></Stack>)}</Box></Panel><Panel title="Upcoming Holidays" action={linkButton("View all")}><DashboardList items={[{ title: "Deepavali", date: "Nov 12, Sunday" }, { title: "Easter", date: "Nov 12, Sunday" }, { title: "Gudhi Padwa", date: "Nov 12, Sunday" }]} /></Panel></Box>

    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" }, gap: 2 }}><Panel title="Leave Balance" action={linkButton("Apply New", "/apply-leave")}><Stack direction="row" spacing={1} justifyContent="space-around" sx={{ mb: 2 }}><Gauge used={8} total={12} label="Casual" /><Gauge used={6} total={12} label="Sick" /><Gauge used={5} total={56} label="Earned" /></Stack><Divider sx={{ mb: 1.5, borderColor: "#edf1f3" }} /><Stack direction="row" justifyContent="space-between"><Typography variant="caption" fontWeight={800} color={navy}>Last Application</Typography>{linkButton("View", "/apply-leave")}</Stack><Box sx={{ mt: 1, p: 1.25, border: "1px solid #e2e8f0", borderRadius: 1, display: "flex", justifyContent: "space-between", gap: 1, alignItems: "center" }}><Box><Typography variant="caption" fontWeight={700}>Casual Leave from 25/05 to 30/05</Typography><Typography variant="caption" display="block" color="text.secondary">Applied on 05/05/2026</Typography></Box><Typography variant="caption" fontWeight={700} sx={{ px: 1, py: 0.5, bgcolor: "#e6f9f2", color: "#065f46", borderRadius: 1 }}>Approved</Typography></Box></Panel><Panel title="Notifications" action={linkButton("View all")}><DashboardList buttonLabel="View" items={[{ title: "Yash has filed a reimbursement request", date: "Nov 12, Sunday" }, { title: "Leave Request Approved", date: "Nov 12, Sunday" }, { title: "Sakshi has filed a reimbursement request", date: "Nov 12, Sunday" }]} /></Panel></Box>
  </Stack><IconButton aria-label="Open HR Assistant Chat" title="HR Assistant / Chat" sx={{ position: "fixed", right: { xs: 20, sm: 28 }, bottom: 24, bgcolor: navy, color: "white", boxShadow: 4, "&:hover": { bgcolor: "#08354f" } }}><ChatBubbleOutlineRounded /></IconButton></Box>;
}

export default Home;
