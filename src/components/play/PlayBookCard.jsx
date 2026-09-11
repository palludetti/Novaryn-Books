import React, { useState } from 'react';
import { ExternalLink, Zap } from 'lucide-react';

export default function PlayBookCard({ book, language = 'en' }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const isComingSoon = book.status === 'coming-soon';
  const description = language === 'pt' ? book.descriptionPt : book.description;
  const cover = language === 'pt' && book.coverPt ? book.coverPt : book.cover;
  
  const edition = book.editions[language] || {};
  const hasAmazonLink = edition.amazonUS || edition.amazonBR;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a202c 0%, #0f1419 100%)',
      border: '1px solid rgba(255, 153, 0, 0.15)',
      borderRadius: 'clamp(12px, 2vw, 16px)',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255, 153, 0, 0.35)';
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 12px 24px rgba(255, 153, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255, 153, 0, 0.15)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      
      {/* Cover Image */}
      <div style={{
        position: 'relative',
        aspectRatio: '2/3',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(26, 32, 44, 0.8) 100%)'
      }}>
        {/* Image */}
        <img
          src={cover}
          alt={book.title}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded && !imageError ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        />

        {/* Loading/Error state */}
        {(!imageLoaded || imageError) && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #1a2332 0%, #0f1419 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff9900',
            fontSize: '3rem',
            fontWeight: 900,
            textAlign: 'center',
            padding: '20px'
          }}>
            {book.id.split('-')[0].toUpperCase()}
          </div>
        )}
        
        {/* Coming Soon Overlay */}
        {isComingSoon && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(3px)',
            gap: '12px'
          }}>
            <div style={{
              textAlign: 'center',
              color: '#ff9900',
              fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              {language === 'pt' ? 'Em Produção' : 'In Production'}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'rgba(255, 153, 0, 0.7)',
              letterSpacing: '0.05em'
            }}>
              {language === 'pt' ? 'DISPONÍVEL EM BREVE' : 'COMING SOON'}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ 
        padding: 'clamp(16px, 3vw, 20px)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        
        {/* Title & Author */}
        <div style={{ marginBottom: '12px' }}>
          <h3 style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 4px 0',
            letterSpacing: '-0.01em',
            lineHeight: 1.2
          }}>
            {book.title}
          </h3>
          
          <p style={{
            fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
            color: '#ff9900',
            margin: '4px 0',
            fontWeight: 700,
            letterSpacing: '0.02em'
          }}>
            {book.subtitle}
          </p>

          <p style={{
            fontSize: '0.75rem',
            color: '#94a3b8',
            margin: '4px 0 0 0',
            fontWeight: 600
          }}>
            by Adrian Vossell
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
          color: '#cbd5e1',
          margin: '0 0 16px 0',
          lineHeight: 1.6,
          flex: 1
        }}>
          {description}
        </p>

        {/* Metadata & Buttons */}
        {!isComingSoon && edition && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Kindle Unlimited Badge - only show in EN */}
            {edition.hasKU && language !== 'pt' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '6px',
                color: '#22c55e',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                <Zap size={14} />
                Kindle Unlimited
              </div>
            )}

            {/* Amazon Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* English Edition Badge (for PT language) */}
              {edition.isEnglishEdition && language === 'pt' && (
                <div style={{
                  padding: '4px 8px',
                  background: 'rgba(255, 153, 0, 0.1)',
                  border: '1px solid rgba(255, 153, 0, 0.3)',
                  color: '#ff9900',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Edição em Inglês
                </div>
              )}

              {edition.amazonUS && (
                <a 
                  href={edition.amazonUS}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: 'clamp(8px, 2vw, 10px) 12px',
                    background: 'linear-gradient(135deg, #ff9900, #ff8800)',
                    color: '#0f1419',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                    transition: 'all 0.2s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ffaa00, #ff9900)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ff9900, #ff8800)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {language === 'pt' ? 'Amazon US' : 'Amazon US'}
                  <ExternalLink size={14} />
                </a>
              )}

              {/* Amazon Brasil Link or Coming Soon Text */}
              {edition.amazonBR && (
                <a 
                  href={edition.amazonBR}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: 'clamp(8px, 2vw, 10px) 12px',
                    background: 'linear-gradient(135deg, #ff9900, #ff8800)',
                    color: '#0f1419',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                    transition: 'all 0.2s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ffaa00, #ff9900)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ff9900, #ff8800)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {typeof edition.amazonBRDisplay === 'object' ? edition.amazonBRDisplay[language] : edition.amazonBRDisplay || 'Amazon Brasil'}
                  <ExternalLink size={14} />
                </a>
              )}

              {/* Coming Soon Text (no link) */}
              {edition.amazonBRLabel && !edition.amazonBR && (
                <div style={{
                  padding: 'clamp(8px, 2vw, 10px) 12px',
                  background: 'rgba(255, 153, 0, 0.1)',
                  border: '1px solid rgba(255, 153, 0, 0.3)',
                  color: '#ff9900',
                  textAlign: 'center',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {typeof edition.amazonBRLabel === 'object' ? edition.amazonBRLabel[language] : edition.amazonBRLabel}
                </div>
              )}

              {/* English Edition Link (for PT language as alternative) */}
              {edition.englishEdition && language === 'pt' && (
                <a 
                  href={edition.englishEdition}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: 'clamp(8px, 2vw, 10px) 12px',
                    background: 'rgba(255, 153, 0, 0.15)',
                    color: '#ff9900',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
                    transition: 'all 0.2s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    border: '1px solid rgba(255, 153, 0, 0.3)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 153, 0, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(255, 153, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 153, 0, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255, 153, 0, 0.3)';
                  }}
                >
                  Edição em inglês — Amazon Brasil
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Price Info */}
            {edition.priceBR && (
              <div style={{
                padding: '8px',
                background: 'rgba(255, 153, 0, 0.05)',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '0.8rem',
                color: '#ff9900',
                fontWeight: 700
              }}>
                {language === 'pt' ? 'Brasil' : 'Brazil'}: {edition.priceBR}
              </div>
            )}
          </div>
        )}

        {/* Coming Soon - No Links */}
        {isComingSoon && (
          <div style={{
            padding: '12px',
            background: 'rgba(255, 153, 0, 0.08)',
            border: '1px dashed rgba(255, 153, 0, 0.2)',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
            color: '#ff9900',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {language === 'pt' ? 'Em Produção' : 'In Production'}
          </div>
        )}
      </div>
    </div>
  );
}
