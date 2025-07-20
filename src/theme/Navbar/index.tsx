import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig } from '@docusaurus/theme-common';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarSearch from '@theme/Navbar/Search';
import './styles.css';

interface NavbarItem {
  type?: string;
  label: string;
  to?: string;
  href?: string;
  items?: NavbarItem[];
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string;
    children: React.ReactNode;
  }
>(({ className, children, title, ...props }, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <a
        className={classnames('ListItemLink', className)}
        {...props}
        ref={forwardedRef}
      >
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
));

const CardanoNavbar: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { navbar } = useThemeConfig();
  const items = navbar.items as NavbarItem[];

  const renderNavbarItem = (item: NavbarItem, index: number) => {
    if (item.items && item.items.length > 0) {
      return (
        <NavigationMenu.Item key={index}>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            {item.label} <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className={`List ${index === 0 ? 'featured' : 'standard'}`}>
              {index === 0 && (
                <li style={{ gridRow: 'span 3' }}>
                  <NavigationMenu.Link asChild>
                    <a className="Callout" href={item.items[0]?.href || item.items[0]?.to}>
                      <div className="CalloutIcon">
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                          <path d="M19 38C8.5 38 0 29.5 0 19S8.5 0 19 0s19 8.5 19 19-8.5 19-19 19z" fill="currentColor"/>
                          <path d="M19 6v26l13-13-13-13z" fill="white"/>
                        </svg>
                      </div>
                      <div className="CalloutHeading">Get Started with Cardano</div>
                      <p className="CalloutText">
                        Everything you need to start building on Cardano blockchain.
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
              )}
              {item.items.map((subItem, subIndex) => (
                <ListItem
                  key={subIndex}
                  href={subItem.href || subItem.to}
                  title={subItem.label}
                >
                  {getItemDescription(subItem.label)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      );
    }

    return (
      <NavigationMenu.Item key={index}>
        <NavigationMenu.Link
          className="NavigationMenuLink"
          href={item.href || item.to}
        >
          {item.label}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  };

  const getItemDescription = (label: string): string => {
    const descriptions: Record<string, string> = {
      'Overview': 'Learn the basics of Cardano development',
      'Cardano Node': 'Set up and run your own Cardano node',
      'Development Environment': 'Configure your development setup',
      'Cardano Serialization Library': 'Work with Cardano data structures',
      'Builder Tools': 'Essential tools for Cardano developers',
      'Showcase': 'Featured projects built on Cardano',
      'Dev Blog': 'Latest updates and tutorials',
      'External Docs': 'Official Cardano documentation',
    };
    return descriptions[label] || 'Learn more about this topic';
  };

  return (
    <nav className="navbar navbar--fixed-top">
      <div className="navbar__inner">
        <div className="navbar__items">
          <NavbarLogo />
          
          <NavigationMenu.Root className="NavigationMenuRoot">
            <NavigationMenu.List className="NavigationMenuList">
              {items
                .filter(item => item.type !== 'search')
                .map((item, index) => renderNavbarItem(item, index))}
              
              <NavigationMenu.Indicator className="NavigationMenuIndicator">
                <div className="Arrow" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="ViewportPosition">
              <NavigationMenu.Viewport className="NavigationMenuViewport" />
            </div>
          </NavigationMenu.Root>
        </div>

        <div className="navbar__items navbar__items--right">
          <NavbarSearch />
          <NavbarColorModeToggle />
          {items
            .filter(item => item.type === 'html' || item.href?.includes('github'))
            .map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="navbar__item navbar__link header-github-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default CardanoNavbar;