import { TestBed } from '@angular/core/testing';

import { ContextConversationService } from './context-conversation.service';

describe('ContextConversationService', () => {
  let service: ContextConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextConversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
