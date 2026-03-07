"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { 
  Mail, Phone, MapPin, Send, 
  MessageSquare, Clock, Headphones
} from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      key: "email",
      value: "hello@alina.com",
      href: "mailto:hello@alina.com"
    },
    {
      icon: Phone,
      key: "phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      key: "location",
      value: locale === "en" ? "San Francisco, CA" : "سان فرانسيسكو، كاليفورنيا",
      href: "#"
    }
  ];

  const supportFeatures = [
    { icon: Headphones, key: "support247" },
    { icon: MessageSquare, key: "liveChat" },
    { icon: Clock, key: "fastResponse" }
  ];

  return (
    <main className="w-full bg-background">
      {/* Hero Section - Apple Style */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c71463]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3E9666]/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          </div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 py-20 text-center">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                {locale === "en" ? (
                  <>Get in <span className="text-[#c71463]">Touch</span></>
                ) : (
                  <>تواصل <span className="text-[#c71463]">معنا</span></>
                )}
              </span>
            </h1>
            
            <p className="mx-auto max-w-3xl text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 lg:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid sm:grid-cols-3 gap-6 mb-20">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              
              return (
                <a
                  key={info.key}
                  href={info.href}
                  className="group relative p-8 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/60 hover:border-[#c71463]/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#c71463]/10 flex items-center justify-center group-hover:bg-[#c71463]/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#c71463]" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {t(`info.${info.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {t("form.title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("form.subtitle")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("form.nameLabel")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("form.namePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-[#c71463] focus:ring-2 focus:ring-[#c71463]/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("form.emailLabel")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t("form.emailPlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-[#c71463] focus:ring-2 focus:ring-[#c71463]/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {t("form.subjectLabel")}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t("form.subjectPlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-[#c71463] focus:ring-2 focus:ring-[#c71463]/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("form.messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t("form.messagePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-[#c71463] focus:ring-2 focus:ring-[#c71463]/20 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[#c71463] hover:bg-[#c71463]/90 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>{t("form.sending")}</span>
                  ) : (
                    <>
                      <span>{t("form.submit")}</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Support Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {t("support.title")}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("support.subtitle")}
                </p>
              </div>

              <div className="space-y-6">
                {supportFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  
                  return (
                    <div
                      key={feature.key}
                      className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/60 hover:border-[#3E9666]/40 transition-all duration-300"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#3E9666]/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#3E9666]" />
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            {t(`support.features.${feature.key}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t(`support.features.${feature.key}.description`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FAQ Link */}
              <div className="pt-8">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#3E9666]/10 to-[#c71463]/10 border border-border/40">
                  <h3 className="text-xl font-semibold mb-2">
                    {t("faq.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("faq.description")}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-[#c71463] hover:text-[#c71463]/80 font-medium transition-colors"
                  >
                    {t("faq.link")}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
