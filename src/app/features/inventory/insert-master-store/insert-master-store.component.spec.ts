import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMasterStoreComponent } from './insert-master-store.component';

describe('InsertMasterStoreComponent', () => {
  let component: InsertMasterStoreComponent;
  let fixture: ComponentFixture<InsertMasterStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertMasterStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertMasterStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
