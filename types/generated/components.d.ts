import type { Attribute, Schema } from '@strapi/strapi';

export interface ProjectContentSectionImageRight extends Schema.Component {
  collectionName: 'components_project_content_section_image_rights';
  info: {
    displayName: 'ContentSectionImageRight';
  };
  attributes: {
    Body: Attribute.Blocks;
    Image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Attribute.String;
  };
}

export interface ProjectContentSectionMediaAsset extends Schema.Component {
  collectionName: 'components_project_content_section_media_assets';
  info: {
    displayName: 'ContentSectionMediaAsset';
  };
  attributes: {
    MediaAsset: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ProjectContentSectionPhones extends Schema.Component {
  collectionName: 'components_project_content_section_phones';
  info: {
    description: '';
    displayName: 'ContentSectionPhones';
  };
  attributes: {
    Body: Attribute.Text;
    MediaAsset: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
  };
}

export interface ProjectCredit extends Schema.Component {
  collectionName: 'components_project_credits';
  info: {
    displayName: 'ContentSectionCredit';
  };
  attributes: {
    Name: Attribute.String;
    Position: Attribute.String;
  };
}

export interface ProjectLink extends Schema.Component {
  collectionName: 'components_project_links';
  info: {
    displayName: 'ExternalLink';
  };
  attributes: {
    Label: Attribute.String;
    Link: Attribute.String;
  };
}

export interface ProjectMedia extends Schema.Component {
  collectionName: 'components_project_media';
  info: {
    displayName: 'ContentSectionMedia';
  };
  attributes: {
    Media: Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface ProjectSection extends Schema.Component {
  collectionName: 'components_project_sections';
  info: {
    displayName: 'ContentSection';
  };
  attributes: {
    Body: Attribute.Blocks;
    Title: Attribute.String;
  };
}

export interface ProjectVimeo extends Schema.Component {
  collectionName: 'components_project_vimeos';
  info: {
    displayName: 'VimeoEmbed';
  };
  attributes: {
    VimeoId: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'project.content-section-image-right': ProjectContentSectionImageRight;
      'project.content-section-media-asset': ProjectContentSectionMediaAsset;
      'project.content-section-phones': ProjectContentSectionPhones;
      'project.credit': ProjectCredit;
      'project.link': ProjectLink;
      'project.media': ProjectMedia;
      'project.section': ProjectSection;
      'project.vimeo': ProjectVimeo;
    }
  }
}
