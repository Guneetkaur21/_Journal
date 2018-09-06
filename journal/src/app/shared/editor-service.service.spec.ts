import { TestBed, inject } from '@angular/core/testing';

import { EditorServiceService } from './editor-service.service';

describe('EditorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorServiceService]
    });
  });

  it('should be created', inject([EditorServiceService], (service: EditorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
