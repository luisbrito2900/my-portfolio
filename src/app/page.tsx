'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
  Smartphone,
  GitBranch,
  Search,
  Building2,
  MapPin,
  Calendar,
} from 'lucide-react';
import profileData from '../profile.json';

export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);
  const [pointer, setPointer] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--x', `${x}px`);
    target.style.setProperty('--y', `${y}px`);
    setPointer({ x, y });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Esperar un momento para que el DOM se actualice
      setTimeout(() => {
        const offset = 100; // Mayor offset para mejor visualización
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }, 10);
    }
    setNavOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormStatus({ type: 'loading', message: 'Sending...' });

    try {
      const response = await fetch('https://formspree.io/f/xovpkqob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      });
    }
  };

  return (
    <div className='bg-black text-white min-h-screen relative'>
      {/* Fondo unificado con gradiente */}
      <div className='fixed inset-0 bg-gradient-to-br from-purple-950/30 via-black to-pink-950/30 pointer-events-none z-0' />
      <div className='fixed inset-0 bg-[radial-gradient(circle_at_center_top,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none z-0' />
      {/* Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
          <button
            onClick={() => scrollToSection('home')}
            className='flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer'
          >
            <div className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-0.5'>
              <div className='w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden'>
                <Image
                  src='/logo.png'
                  alt='LB Logo'
                  width={40}
                  height={40}
                  className='rounded-full object-cover w-full h-full p-1'
                />
              </div>
            </div>
            <div className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent'>
              Luis Brito
            </div>
          </button>

          <div className='hidden md:flex gap-8'>
            {[
              'Home',
              'About',
              'Experience',
              'Skills',
              'Projects',
              'Contact',
            ].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className='text-white/80 hover:text-white transition-colors cursor-pointer'
              >
                {item}
              </button>
            ))}
          </div>

          <div className='md:hidden'>
            <button onClick={() => setNavOpen(!navOpen)} className='text-white'>
              {navOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className='md:hidden bg-black/95 backdrop-blur-lg p-6 border-t border-white/10'>
            <div className='flex flex-col gap-4'>
              {[
                'Home',
                'About',
                'Experience',
                'Skills',
                'Projects',
                'Contact',
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className='text-left text-white/80 hover:text-white transition-colors cursor-pointer'
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id='home'
        className='min-h-screen flex items-center justify-center relative overflow-hidden z-10'
      >
        <div className='max-w-4xl mx-auto px-6 py-20 text-center relative z-10'>
          <div className='w-40 h-40 md:w-48 md:h-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1'>
            <div className='w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden'>
              <Image
                src='/profile-photo.jpg'
                alt='Luis Brito'
                width={192}
                height={192}
                className='rounded-full object-cover object-center w-full h-full'
                priority
              />
            </div>
          </div>

          <h1 className='text-5xl md:text-7xl font-bold mb-6 font-mono'>
            {"<Hello, I'm Luis />".split('').map((char, index) =>
              char === ' ' ? (
                <span
                  key={index}
                  className='bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent'
                >
                  &nbsp;
                </span>
              ) : (
                <span
                  key={index}
                  className='bounce-letter bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent inline-block'
                >
                  {char}
                </span>
              )
            )}
          </h1>
          <h2 className='text-4xl md:text-6xl font-bold mb-8'>SDET</h2>
          <p className='text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto'>
            ISTQB Certified Tester with 5+ years of experience
          </p>
          <p className='text-lg text-gray-400 mb-12 max-w-2xl mx-auto'>
            Specialized in test automation for web and mobile applications,
            CI/CD integration, and scalable automation frameworks
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <a
              href='#projects'
              onMouseMove={handleMouseMove}
              className='button-glow px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105'
            >
              View Projects <ArrowRight />
            </a>
            <a
              href='#contact'
              onMouseMove={handleMouseMove}
              className='button-glow px-8 py-4 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 transition-all hover:scale-105'
            >
              Contact Me
            </a>
          </div>

          <div className='flex gap-6 justify-center mt-12'>
            <a
              href='https://github.com/luisbrito2900'
              target='_blank'
              rel='noopener noreferrer'
              onMouseMove={handleMouseMove}
              className='button-glow text-white/60 hover:text-white hover:scale-125 transition-all'
            >
              <Github size={28} />
            </a>
            <a
              href='https://www.linkedin.com/in/luis-brito-54ba95209'
              target='_blank'
              rel='noopener noreferrer'
              onMouseMove={handleMouseMove}
              className='button-glow text-white/60 hover:text-white hover:scale-125 transition-all'
            >
              <Linkedin size={28} />
            </a>
            <a
              href='mailto:lbritolpara@gmail.com'
              onMouseMove={handleMouseMove}
              className='button-glow text-white/60 hover:text-white hover:scale-125 transition-all'
            >
              <Mail size={28} />
            </a>
          </div>
        </div>

        <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <ArrowRight className='rotate-90 text-white/40' />
        </div>
      </section>

      {/* About Section */}
      <section
        id='about'
        className='min-h-screen pt-24 pb-24 px-6 relative z-10'
      >
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-tight pb-2'>
            About Me
          </h2>

          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6 text-lg text-gray-300 leading-relaxed'>
              <p>
                I'm a dedicated QA Automation Engineer with over 5 years of
                experience in Agile environments. Specialized in test automation
                for both web and mobile applications, I'm passionate about
                improving testing efficiency and product quality.
              </p>
              <p>
                Known for attention to detail, adaptability, and proactive
                problem-solving. I have experience working with fintech, CRM,
                and payments platforms, with a strong focus on scalability,
                CI/CD integration, and reducing flakiness in test pipelines.
              </p>
              <p>
                ISTQB Certified Tester, I'm always learning new testing
                technologies and seeking opportunities to grow both personally
                and professionally in the quality assurance field.
              </p>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  icon: <Code size={32} />,
                  title: 'Test Automation',
                  desc: 'Cypress, Playwright, WebdriverIO',
                },
                {
                  icon: <Smartphone size={32} />,
                  title: 'Mobile Testing',
                  desc: 'Appium, Detox',
                },
                {
                  icon: <GitBranch size={32} />,
                  title: 'CI/CD Integration',
                  desc: 'Jenkins, GitHub Actions, GitLab',
                },
                {
                  icon: <Search size={32} />,
                  title: 'Quality Assurance',
                  desc: 'ISTQB Certified, Test Strategy',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  onMouseMove={handleMouseMove}
                  className='button-glow p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 backdrop-blur-sm hover:border-white/20 hover:scale-105 transition-all cursor-pointer'
                >
                  <div className='text-purple-400 mb-4'>{item.icon}</div>
                  <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                  <p className='text-gray-400 text-sm'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id='experience'
        className='min-h-screen pt-12 pb-24 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent'
      >
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-tight pb-2'>
            Work Experience
          </h2>

          <div className='space-y-8'>
            {/* Thryv */}
            <div
              onMouseMove={handleMouseMove}
              className='button-glow group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              <div className='relative p-8'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                  <div>
                    <h3 className='text-2xl font-bold mb-2 flex items-center gap-2'>
                      <Building2 className='text-purple-400' size={24} />
                      Software Test Engineer
                    </h3>
                    <p className='text-xl text-purple-300 mb-2 flex items-center gap-2'>
                      Thryv
                    </p>
                    <div className='flex flex-wrap items-center gap-3 text-sm text-gray-400'>
                      <span className='flex items-center gap-1'>
                        <MapPin size={14} />
                        United States • Remote
                      </span>
                      <span className='flex items-center gap-1'>
                        <Calendar size={14} />
                        Nov 2023 – Present
                      </span>
                    </div>
                  </div>
                </div>
                <p className='text-gray-300 mb-4'>
                  Automating test cases for web and mobile platforms using
                  Cypress, and Appium. Mentoring team members on automation best
                  practices, integrating automated tests into CI/CD pipelines,
                  and maintaining scalable QA frameworks for reliable test
                  execution.
                </p>
                <div className='flex flex-wrap gap-2'>
                  {profileData.experience[0].stack.map((tech: string) => (
                    <span
                      key={tech}
                      className='px-3 py-1 text-xs rounded-full bg-purple-500/20 border border-purple-500/30'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Banco Popular */}
            <div
              onMouseMove={handleMouseMove}
              className='button-glow group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              <div className='relative p-8'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                  <div>
                    <h3 className='text-2xl font-bold mb-2 flex items-center gap-2'>
                      <Building2 className='text-purple-400' size={24} />
                      Project Lead – QA Automation
                    </h3>
                    <p className='text-xl text-purple-300 mb-2'>
                      Dominican Popular Bank
                    </p>
                    <div className='flex flex-wrap items-center gap-3 text-sm text-gray-400'>
                      <span className='flex items-center gap-1'>
                        <MapPin size={14} />
                        Dominican Republic • Hybrid
                      </span>
                      <span className='flex items-center gap-1'>
                        <Calendar size={14} />
                        May 2023 – Nov 2023
                      </span>
                    </div>
                  </div>
                </div>
                <p className='text-gray-300 mb-4'>
                  Led QA team, developed test strategies, mentored members, and
                  set up CI/CD pipelines for automated testing with DevOps.
                </p>
                <div className='flex flex-wrap gap-2'>
                  {profileData.experience[1].stack.map((tech: string) => (
                    <span
                      key={tech}
                      className='px-3 py-1 text-xs rounded-full bg-pink-500/20 border border-pink-500/30'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Portal */}
            <div
              onMouseMove={handleMouseMove}
              className='button-glow group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              <div className='relative p-8'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                  <div>
                    <h3 className='text-2xl font-bold mb-2 flex items-center gap-2'>
                      <Building2 className='text-purple-400' size={24} />
                      QA Automation Engineer
                    </h3>
                    <p className='text-xl text-purple-300 mb-2'>Portal</p>
                    <div className='flex flex-wrap items-center gap-3 text-sm text-gray-400'>
                      <span className='flex items-center gap-1'>
                        <MapPin size={14} />
                        Dominican Republic • Hybrid
                      </span>
                      <span className='flex items-center gap-1'>
                        <Calendar size={14} />
                        Aug 2022 – May 2023
                      </span>
                    </div>
                  </div>
                </div>
                <p className='text-gray-300 mb-4'>
                  Planned and managed overall QA strategy. Developed automated
                  test suites for mobile apps ensuring high coverage and
                  accuracy through continuous testing.
                </p>
                <div className='flex flex-wrap gap-2'>
                  {profileData.experience[2].stack.map((tech: string) => (
                    <span
                      key={tech}
                      className='px-3 py-1 text-xs rounded-full bg-blue-500/20 border border-blue-500/30'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Oriontek (Unified) */}
            <div
              onMouseMove={handleMouseMove}
              className='button-glow group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              <div className='relative p-8'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                  <div>
                    <h3 className='text-2xl font-bold mb-2 flex items-center gap-2'>
                      <Building2 className='text-purple-400' size={24} />
                      QA Engineer (Jr → Mid)
                    </h3>
                    <p className='text-xl text-purple-300 mb-2'>Oriontek</p>
                    <div className='flex flex-wrap items-center gap-3 text-sm text-gray-400'>
                      <span className='flex items-center gap-1'>
                        <MapPin size={14} />
                        Dominican Republic • Remote
                      </span>
                      <span className='flex items-center gap-1'>
                        <Calendar size={14} />
                        Feb 2020 – Aug 2022
                      </span>
                    </div>
                  </div>
                </div>
                <p className='text-gray-300 mb-4'>
                  Progressed from manual to automated testing. Designed and
                  executed Cypress tests, tracked QA metrics, and contributed to
                  continuous improvement of development processes.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <span className='px-3 py-1 text-xs rounded-full bg-orange-500/20 border border-orange-500/30'>
                    Cypress
                  </span>
                  <span className='px-3 py-1 text-xs rounded-full bg-orange-500/20 border border-orange-500/30'>
                    Postman
                  </span>
                  <span className='px-3 py-1 text-xs rounded-full bg-orange-500/20 border border-orange-500/30'>
                    GitLab
                  </span>
                  <span className='px-3 py-1 text-xs rounded-full bg-orange-500/20 border border-orange-500/30'>
                    Azure
                  </span>
                  <span className='px-3 py-1 text-xs rounded-full bg-orange-500/20 border border-orange-500/30'>
                    Jira
                  </span>
                  <span className='px-3 py-1 text-xs rounded-full bg-orange-500/20 border border-orange-500/30'>
                    Agile
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id='skills'
        className='min-h-screen pt-24 pb-24 px-6 relative z-10'
      >
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-tight pb-2'>
            Skills & Technologies
          </h2>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Test Frameworks',
                tech: [
                  'Cypress',
                  'Playwright',
                  'WebdriverIO',
                  'Selenium Webdriver',
                  'Appium',
                  'Detox',
                ],
              },
              {
                title: 'Languages & Tools',
                tech: [
                  'JavaScript',
                  'Python',
                  'Java',
                  'TestRail',
                  'BrowserStack',
                  'Postman',
                ],
              },
              {
                title: 'Platforms & Others',
                tech: ['GitHub', 'GitLab', 'Asana', 'ClickUp', 'Jira', 'Azure'],
              },
            ].map((category: { title: string; tech: string[] }, i) => (
              <div key={i} className='relative group'>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 rounded-3xl' />
                <div
                  onMouseMove={handleMouseMove}
                  className='button-glow relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all h-full'
                >
                  <h3 className='text-2xl font-bold mb-6'>{category.title}</h3>
                  <div className='space-y-3'>
                    {category.tech.map((tech: string, j: number) => (
                      <div
                        key={j}
                        className='flex items-center gap-3 text-gray-300'
                      >
                        <div className='w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-600' />
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id='projects'
        className='min-h-screen pt-12 pb-24 px-6 relative z-10'
      >
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-tight pb-2'>
            Featured Projects
          </h2>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                title: 'Playwright Automation Exercise',
                description:
                  'Web automation framework with POM, dynamic data, and CI/CD-ready utilities. Validates E2E authentication flows.',
                tech: ['Playwright', 'TypeScript', 'POM', 'GitHub Actions'],
                icon: (
                  <Image
                    src='/playwright-logo.png'
                    alt='Playwright'
                    width={48}
                    height={48}
                    className='w-12 h-12 object-contain'
                  />
                ),
                link: 'https://github.com/luisbrito2900/playwright-automation-exercise',
              },
              {
                title: 'Automation Exercise (Cypress)',
                description:
                  'Production-style Cypress framework automating full e-commerce flow with Page Objects and HTML reporting.',
                tech: ['Cypress', 'JavaScript', 'Faker.js', 'Mochawesome'],
                icon: (
                  <Image
                    src='/cypress-logo.svg'
                    alt='Cypress'
                    width={48}
                    height={48}
                    className='w-12 h-12 object-contain'
                  />
                ),
                link: 'https://github.com/luisbrito2900/automation-exercise-cypress',
              },
              {
                title: 'iOS Test App',
                description:
                  'Lightweight SwiftUI app instrumented for testability with XCUITest coverage using accessibility identifiers.',
                tech: ['SwiftUI', 'XCUITest', 'Xcode', 'iOS 17'],
                icon: (
                  <Image
                    src='/xcuitest-logo.png'
                    alt='iOS XCUITest'
                    width={48}
                    height={48}
                    className='w-12 h-12 object-contain'
                  />
                ),
                link: 'https://github.com/luisbrito2900/iOS-Test-App',
              },
              {
                title: 'Espresso UI Tests Demo',
                description:
                  'Kotlin Android Todo app with production-like Espresso UI test suite. Demonstrates end-to-end CRUD flows.',
                tech: ['Kotlin', 'Espresso', 'AndroidX', 'Room'],
                icon: (
                  <Image
                    src='/espresso-logo.png'
                    alt='Espresso'
                    width={48}
                    height={48}
                    className='w-12 h-12 object-contain'
                  />
                ),
                link: 'https://github.com/luisbrito2900/EspressoUITestsDemo',
              },
              {
                title: 'API Testing CodeceptJS PoC',
                description:
                  'REST API testing Proof-of-Concept using CodeceptJS with REST and JSONResponse helpers.',
                tech: ['CodeceptJS', 'TypeScript', 'REST', 'API Testing'],
                icon: (
                  <Image
                    src='/codecept-logo.svg'
                    alt='CodeceptJS'
                    width={48}
                    height={48}
                    className='w-12 h-12 object-contain'
                  />
                ),
                link: 'https://github.com/luisbrito2900/codeceptjs-api-poc',
              },
              {
                title: 'Mocha Test Example',
                description:
                  'Minimal Mocha + Chai setup demonstrating a basic unit test suite in Node.js for simple math operations.',
                tech: ['Mocha', 'Chai', 'Node.js', 'Unit Tests'],
                icon: (
                  <Image
                    src='/mocha-logo.png'
                    alt='Mocha'
                    width={48}
                    height={48}
                    className='w-12 h-12 object-contain'
                  />
                ),
                link: 'https://github.com/luisbrito2900/mocha-test-example',
              },
            ].map((project, i) => (
              <div
                key={i}
                onMouseMove={handleMouseMove}
                className='button-glow group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:-translate-y-2 transition-all cursor-pointer'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300' />
                <div className='relative p-6 h-full flex flex-col'>
                  <div className='mb-4 flex justify-center'>{project.icon}</div>
                  <h3 className='text-2xl font-bold mb-3'>{project.title}</h3>
                  <p className='text-gray-400 mb-4 flex-grow'>
                    {project.description}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className='px-3 py-1 text-xs rounded-full bg-white/10'
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className='flex gap-3'>
                    <a
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 text-sm font-semibold hover:text-purple-400 transition-colors'
                    >
                      View Repo <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id='contact'
        className='min-h-screen pt-24 pb-24 px-6 relative z-10'
      >
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-tight pb-2'>
            Let's Work Together!
          </h2>

          <div className='bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12'>
            <p className='text-xl text-center mb-8 text-gray-300'>
              Have a project in mind? I'd love to hear your idea and see how we
              can make it a reality.
            </p>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Name'
                  required
                  className='w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors'
                />
              </div>
              <div>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Email'
                  required
                  className='w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors'
                />
              </div>
              <div>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder='Message'
                  rows={6}
                  required
                  className='w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none'
                />
              </div>
              {formStatus.message && (
                <div
                  className={`p-4 rounded-xl ${
                    formStatus.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                      : formStatus.type === 'error'
                      ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                      : 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
              <button
                type='submit'
                disabled={formStatus.type === 'loading'}
                onMouseMove={handleMouseMove}
                className='button-glow w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
              >
                {formStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className='mt-12 flex flex-wrap justify-center gap-6'>
              <a
                href='https://github.com/luisbrito2900'
                target='_blank'
                rel='noopener noreferrer'
                onMouseMove={handleMouseMove}
                className='button-glow p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all'
              >
                <Github size={24} />
              </a>
              <a
                href='https://www.linkedin.com/in/luis-brito-54ba95209'
                target='_blank'
                rel='noopener noreferrer'
                onMouseMove={handleMouseMove}
                className='button-glow p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all'
              >
                <Linkedin size={24} />
              </a>
              <a
                href='mailto:lbritolpara@gmail.com'
                onMouseMove={handleMouseMove}
                className='button-glow p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all'
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
