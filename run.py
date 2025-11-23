#!/usr/bin/env python3
"""
Script simple para ejecutar el sitio web de CER localmente.
Simple script to run the CER website locally.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuración
PORT = 8000
DIRECTORY = Path(__file__).parent

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def log_message(self, format, *args):
        # Mensaje personalizado en español
        sys.stdout.write("%s - [%s] %s\n" %
                         (self.address_string(),
                          self.log_date_time_string(),
                          format%args))

def main():
    print("=" * 60)
    print("  🌿 CER - Compañía de Energías Renovables")
    print("=" * 60)
    print(f"\n✅ Servidor iniciado en: http://localhost:{PORT}")
    print(f"📁 Directorio: {DIRECTORY}")
    print("\n📝 Para detener el servidor, presiona Ctrl+C")
    print("=" * 60)
    
    # Cambiar al directorio del proyecto
    os.chdir(DIRECTORY)
    
    # Crear el servidor
    try:
        with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
            print(f"\n🚀 Abriendo el navegador...")
            
            # Abrir el navegador automáticamente
            try:
                webbrowser.open(f'http://localhost:{PORT}')
            except:
                print("⚠️  No se pudo abrir el navegador automáticamente.")
                print(f"   Por favor, abre manualmente: http://localhost:{PORT}")
            
            print(f"\n🔥 Servidor ejecutándose. Visita: http://localhost:{PORT}")
            print(f"   Para ver el panel admin: http://localhost:{PORT}/admin.html")
            print("\n⏸️  Presiona Ctrl+C para detener el servidor\n")
            
            # Mantener el servidor corriendo
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n✋ Servidor detenido por el usuario.")
        print("👋 ¡Hasta luego!\n")
        sys.exit(0)
    except OSError as e:
        if e.errno == 98 or e.errno == 48:  # Puerto en uso
            print(f"\n❌ Error: El puerto {PORT} ya está en uso.")
            print(f"   Intenta cerrar otras aplicaciones o usa otro puerto.\n")
            sys.exit(1)
        else:
            raise

if __name__ == "__main__":
    main()
