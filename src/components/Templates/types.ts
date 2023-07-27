import { CSSProperties } from "react";
import { IconType } from "react-icons/lib";

export interface Template {
  type: string;
  styles: CSSProperties;
  avaliable: boolean;
  component: React.ReactNode;
}

export interface TemplatesByType {
  templateName: string;
  typeIcon: IconType;
  template: Template;
}
